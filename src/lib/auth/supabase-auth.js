// src/lib/auth/supabase-auth.js
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Environment validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with security-first configuration
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce', // Use PKCE for enhanced security
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
    global: {
      headers: {
        'X-Client-Info': 'nri-wealth-platform@1.0.0',
      },
    },
  }
);

// Auth utility class with security features
export class SupabaseAuth {
  constructor(client = supabase) {
    this.client = client;
  }

  // Transform Supabase User to our User type
  transformUser(supabaseUser) {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      phone: supabaseUser.phone,
      fullName: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
      avatar: supabaseUser.user_metadata?.avatar_url,
      role: supabaseUser.user_metadata?.role || 'USER',
      status: supabaseUser.user_metadata?.status || 'ACTIVE',
      emailVerified: !!supabaseUser.email_confirmed_at,
      phoneVerified: !!supabaseUser.phone_confirmed_at,
      mfaEnabled: supabaseUser.user_metadata?.mfa_enabled || false,
      onboardingCompleted: supabaseUser.user_metadata?.onboarding_completed || false,
      lastSignIn: supabaseUser.last_sign_in_at ? new Date(supabaseUser.last_sign_in_at) : undefined,
      createdAt: new Date(supabaseUser.created_at),
      updatedAt: new Date(supabaseUser.updated_at),
    };
  }

  // Transform Supabase Session to our Session type
  transformSession(supabaseSession) {
    return {
      accessToken: supabaseSession.access_token,
      refreshToken: supabaseSession.refresh_token,
      user: this.transformUser(supabaseSession.user),
      expiresAt: new Date(supabaseSession.expires_at * 1000),
      deviceInfo: {
        fingerprint: supabaseSession.user?.user_metadata?.device_fingerprint || '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        ip: '', // This would come from server
        trusted: false,
      },
    };
  }

  // Generate device fingerprint for security tracking
  generateDeviceFingerprint() {
    if (typeof window === 'undefined') return 'server';
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('fp', 10, 10);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join('|');
    
    return btoa(fingerprint).slice(0, 32);
  }

  // Transform Supabase error to our custom error format
  transformError(error) {
    const errorMap = {
      'Invalid login credentials': 'INVALID_CREDENTIALS',
      'Email not confirmed': 'EMAIL_NOT_VERIFIED',
      'User already registered': 'EMAIL_ALREADY_EXISTS',
      'Invalid or expired JWT': 'TOKEN_EXPIRED',
      'Signup requires a valid password': 'WEAK_PASSWORD',
    };

    const code = errorMap[error.message] || 'UNKNOWN_ERROR';
    
    return {
      code,
      message: error.message || 'An unexpected error occurred',
      details: error,
    };
  }

  // Sign up with enhanced security
  async signUp(data) {
    try {
      const deviceFingerprint = this.generateDeviceFingerprint();
      
      const { data: authData, error } = await this.client.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
            referral_code: data.referralCode,
            device_fingerprint: deviceFingerprint,
            agree_to_terms: data.agreeToTerms,
            subscribe_newsletter: data.subscribeNewsletter,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: this.transformError(error),
        };
      }

      return {
        success: true,
        data: {
          user: this.transformUser(authData.user),
          needsVerification: !authData.user?.email_confirmed_at,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: this.transformError(error),
      };
    }
  }

  // Sign in with device tracking
  async signIn(credentials) {
    try {
      const deviceFingerprint = credentials.deviceFingerprint || this.generateDeviceFingerprint();
      
      const { data: authData, error } = await this.client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        // Log security event for failed login
        await this.logSecurityEvent('LOGIN_FAILED', {
          email: credentials.email,
          device_fingerprint: deviceFingerprint,
          error: error.message,
        });

        return {
          success: false,
          error: this.transformError(error),
        };
      }

      // Log successful login
      await this.logSecurityEvent('LOGIN_SUCCESS', {
        user_id: authData.user.id,
        device_fingerprint: deviceFingerprint,
      });

      return {
        success: true,
        data: {
          user: this.transformUser(authData.user),
          session: this.transformSession(authData.session),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: this.transformError(error),
      };
    }
  }

  // OAuth sign in
  async signInWithOAuth(provider, redirectTo) {
    try {
      const { data, error } = await this.client.auth.signInWithOAuth({
        provider: provider.toLowerCase(),
        options: {
          redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
          queryParams: {
            device_fingerprint: this.generateDeviceFingerprint(),
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: this.transformError(error),
        };
      }

      return {
        success: true,
        data: { url: data.url },
      };
    } catch (error) {
      return {
        success: false,
        error: this.transformError(error),
      };
    }
  }

  // Sign out with cleanup
  async signOut() {
    try {
      const { error } = await this.client.auth.signOut();
      
      if (error) {
        return {
          success: false,
          error: this.transformError(error),
        };
      }

      // Clear any client-side data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('onboarding-data');
        sessionStorage.clear();
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.transformError(error),
      };
    }
  }

  // Password reset
  async resetPassword(email) {
    try {
      const { error } = await this.client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return {
          success: false,
          error: this.transformError(error),
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.transformError(error),
      };
    }
  }

  // Update password
  async updatePassword(newPassword) {
    try {
      const { error } = await this.client.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return {
          success: false,
          error: this.transformError(error),
        };
      }

      // Log security event
      await this.logSecurityEvent('PASSWORD_CHANGED', {});

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.transformError(error),
      };
    }
  }

  // Get current session
  async getSession() {
    const { data } = await this.client.auth.getSession();
    return data.session ? this.transformSession(data.session) : null;
  }

  // Get current user
  async getUser() {
    const { data } = await this.client.auth.getUser();
    return data.user ? this.transformUser(data.user) : null;
  }

  // Refresh session
  async refreshSession() {
    try {
      const { data, error } = await this.client.auth.refreshSession();
      
      if (error) {
        return {
          success: false,
          error: this.transformError(error),
        };
      }

      return {
        success: true,
        data: this.transformSession(data.session),
      };
    } catch (error) {
      return {
        success: false,
        error: this.transformError(error),
      };
    }
  }

  // Log security events for monitoring
  async logSecurityEvent(eventType, details) {
    try {
      await this.client
        .from('security_events')
        .insert({
          event_type: eventType,
          details,
          device_fingerprint: details.device_fingerprint || this.generateDeviceFingerprint(),
          ip_address: details.ip_address, // This would come from server
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      // Silent fail for logging - don't break auth flow
      console.warn('Failed to log security event:', error);
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return this.client.auth.onAuthStateChange((event, supabaseSession) => {
      const transformedSession = supabaseSession ? this.transformSession(supabaseSession) : null;
      callback(event, transformedSession);
    });
  }
}

// Default export for easy usage
export const authClient = new SupabaseAuth();