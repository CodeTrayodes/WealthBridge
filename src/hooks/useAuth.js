// src/hooks/useAuth.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authClient } from "@/lib/auth/supabase-auth";
import {
  loginRateLimiter,
  signupRateLimiter,
  passwordResetRateLimiter,
  deviceUtils,
  sessionUtils,
  storageUtils,
  errorUtils,
} from "@/lib/auth/auth-utils";

// Initial state
const initialState = {
  user: null,
  session: null,
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,
  error: null,
  deviceFingerprint: "",
  requiresMFA: false,
  isAccountLocked: false,
  onboardingStep: 1,
  onboardingData: {},
  isOnboardingComplete: false,
};

export const useAuth = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Initialize auth state on app start
      initialize: async () => {
        set({ isLoading: true });

        try {
          // Generate device fingerprint
          const deviceFingerprint = deviceUtils.generateFingerprint();
          set({ deviceFingerprint });

          // Check for existing session
          const session = await authClient.getSession();

          if (session && !sessionUtils.isExpired(session.expiresAt)) {
            const user = await authClient.getUser();

            if (user) {
              set({
                user,
                session,
                isAuthenticated: true,
                isOnboardingComplete: user.onboardingCompleted,
                onboardingStep: user.onboardingCompleted ? 6 : 1,
              });

              // Auto-refresh if needed
              if (sessionUtils.needsRefresh(session.expiresAt)) {
                get().refreshSession();
              }
            }
          }
        } catch (error) {
          console.error("Auth initialization failed:", error);
          set({
            error: errorUtils.createAuthError(
              "UNKNOWN_ERROR",
              "Failed to initialize authentication"
            ),
          });
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },

      // Sign in with rate limiting and security checks
      signIn: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          // Check rate limiting
          if (!loginRateLimiter.increment(credentials.email)) {
            const error = errorUtils.createAuthError(
              "RATE_LIMITED",
              "Too many login attempts. Please wait before trying again."
            );
            set({ error, isLoading: false });
            return { success: false, error };
          }

          // Add device fingerprint
          const deviceFingerprint =
            get().deviceFingerprint || deviceUtils.generateFingerprint();
          const enrichedCredentials = { ...credentials, deviceFingerprint };

          const response = await authClient.signIn(enrichedCredentials);

          if (response.success && response.data) {
            const { user, session } = response.data;

            // Check if onboarding is complete
            const isOnboardingComplete = user.onboardingCompleted;

            set({
              user,
              session,
              isAuthenticated: true,
              isOnboardingComplete,
              onboardingStep: isOnboardingComplete ? 6 : 1,
              isLoading: false,
              error: null,
            });

            // Load saved onboarding data if incomplete
            if (!isOnboardingComplete) {
              const savedData = storageUtils.getSecure("onboarding-data");
              if (savedData) {
                set({ onboardingData: savedData });
              }
            }

            // Reset rate limiting on successful login
            loginRateLimiter.reset(credentials.email);
          } else {
            set({
              error: response.error
                ? errorUtils.createAuthError(
                    response.error.code,
                    response.error.message,
                    response.error.details
                  )
                : null,
              isLoading: false,
            });
          }

          return response;
        } catch (error) {
          const authError = errorUtils.createAuthError(
            "UNKNOWN_ERROR",
            error.message || "An unexpected error occurred"
          );
          set({ error: authError, isLoading: false });
          return { success: false, error: authError };
        }
      },

      // Sign up with validation and rate limiting
      signUp: async (userData) => {
        set({ isLoading: true, error: null });

        try {
          // Check rate limiting
          if (!signupRateLimiter.increment(userData.email)) {
            const error = errorUtils.createAuthError(
              "RATE_LIMITED",
              "Too many signup attempts. Please wait before trying again."
            );
            set({ error, isLoading: false });
            return { success: false, error };
          }

          const response = await authClient.signUp(userData);

          if (response.success && response.data) {
            const { user, needsVerification } = response.data;

            if (needsVerification) {
              // User needs to verify email before proceeding
              set({
                user,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            } else {
              // Auto sign in after successful signup
              set({
                user,
                isAuthenticated: true,
                isOnboardingComplete: false,
                onboardingStep: 1,
                isLoading: false,
                error: null,
              });
            }

            // Reset rate limiting on successful signup
            signupRateLimiter.reset(userData.email);
          } else {
            set({
              error: response.error
                ? errorUtils.createAuthError(
                    response.error.code,
                    response.error.message,
                    response.error.details
                  )
                : null,
              isLoading: false,
            });
          }

          return response;
        } catch (error) {
          const authError = errorUtils.createAuthError(
            "UNKNOWN_ERROR",
            error.message || "An unexpected error occurred"
          );
          set({ error: authError, isLoading: false });
          return { success: false, error: authError };
        }
      },

      // OAuth sign in
      signInWithOAuth: async (provider) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authClient.signInWithOAuth(provider);

          if (!response.success) {
            set({
              error: response.error
                ? errorUtils.createAuthError(
                    response.error.code,
                    response.error.message,
                    response.error.details
                  )
                : null,
              isLoading: false,
            });
          }
          // Note: Loading state will be cleared in the callback

          return response;
        } catch (error) {
          const authError = errorUtils.createAuthError(
            "UNKNOWN_ERROR",
            error.message || "OAuth sign in failed"
          );
          set({ error: authError, isLoading: false });
          return { success: false, error: authError };
        }
      },

      // Sign out with cleanup
      signOut: async () => {
        set({ isLoading: true });

        try {
          await authClient.signOut();

          // Clear all client-side data
          storageUtils.clearAll();

          // Reset to initial state
          set({
            ...initialState,
            isInitialized: true,
            deviceFingerprint: get().deviceFingerprint, // Keep device fingerprint
          });
        } catch (error) {
          console.error("Sign out error:", error);
          // Force logout on client side even if server call fails
          set({
            ...initialState,
            isInitialized: true,
            deviceFingerprint: get().deviceFingerprint,
          });
        }
      },

      // Password reset with rate limiting
      resetPassword: async (email) => {
        set({ isLoading: true, error: null });

        try {
          // Check rate limiting
          if (!passwordResetRateLimiter.increment(email)) {
            const error = errorUtils.createAuthError(
              "RATE_LIMITED",
              "Too many password reset attempts. Please wait before trying again."
            );
            set({ error, isLoading: false });
            return { success: false, error };
          }

          const response = await authClient.resetPassword(email);

          if (response.success) {
            passwordResetRateLimiter.reset(email);
          }

          set({
            error: response.error
              ? errorUtils.createAuthError(
                  response.error.code,
                  response.error.message,
                  response.error.details
                )
              : null,
            isLoading: false,
          });
          return response;
        } catch (error) {
          const authError = errorUtils.createAuthError(
            "UNKNOWN_ERROR",
            error.message || "Password reset failed"
          );
          set({ error: authError, isLoading: false });
          return { success: false, error: authError };
        }
      },

      // Update password
      updatePassword: async (newPassword) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authClient.updatePassword(newPassword);
          set({
            error: response.error
              ? errorUtils.createAuthError(
                  response.error.code,
                  response.error.message,
                  response.error.details
                )
              : null,
            isLoading: false,
          });
          return response;
        } catch (error) {
          const authError = errorUtils.createAuthError(
            "UNKNOWN_ERROR",
            error.message || "Password update failed"
          );
          set({ error: authError, isLoading: false });
          return { success: false, error: authError };
        }
      },

      // Refresh session
      refreshSession: async () => {
        try {
          const response = await authClient.refreshSession();

          if (response.success && response.data) {
            const user = await authClient.getUser();
            set({
              session: response.data,
              user,
              isAuthenticated: true,
            });
          } else {
            // Session refresh failed, sign out
            get().signOut();
          }
        } catch (error) {
          console.error("Session refresh failed:", error);
          get().signOut();
        }
      },

      // Check current session validity
      checkSession: async () => {
        const { session } = get();

        if (!session) return;

        if (sessionUtils.isExpired(session.expiresAt)) {
          get().signOut();
        } else if (sessionUtils.needsRefresh(session.expiresAt)) {
          get().refreshSession();
        }
      },

      // Update onboarding step and save data
      updateOnboardingStep: (step, data) => {
        const currentData = get().onboardingData;
        const updatedData = { ...currentData, ...data };

        set({
          onboardingStep: step,
          onboardingData: updatedData,
        });

        // Persist onboarding data
        storageUtils.setSecure("onboarding-data", updatedData);
      },

      // Complete onboarding process
      completeOnboarding: async () => {
        set({ isLoading: true, error: null });

        try {
          const { user, onboardingData } = get();

          if (!user) {
            throw new Error("User not authenticated");
          }

          // Here you would typically save onboarding data to the server
          // For now, we'll just update the local state

          const updatedUser = { ...user, onboardingCompleted: true };

          set({
            user: updatedUser,
            isOnboardingComplete: true,
            onboardingStep: 6,
            isLoading: false,
          });

          // Clear stored onboarding data
          storageUtils.remove("onboarding-data");

          return { success: true };
        } catch (error) {
          const authError = errorUtils.createAuthError(
            "UNKNOWN_ERROR",
            error.message || "Failed to complete onboarding"
          );
          set({ error: authError, isLoading: false });
          return { success: false, error: authError };
        }
      },

      // Reset onboarding state
      resetOnboarding: () => {
        set({
          onboardingStep: 1,
          onboardingData: {},
          isOnboardingComplete: false,
        });
        storageUtils.remove("onboarding-data");
      },

      // Utility actions
      clearError: () => set({ error: null }),

      setLoading: (loading) => set({ isLoading: loading }),

      // Security helpers
      checkDeviceTrust: () => {
        const { user, deviceFingerprint } = get();
        // This would check against stored trusted devices
        return true; // For now, trust all devices
      },

      logSecurityEvent: (eventType, details = {}) => {
        const { user, deviceFingerprint } = get();

        // Log security event (would typically send to server)
        console.log("Security Event:", {
          type: eventType,
          userId: user?.id,
          deviceFingerprint,
          timestamp: new Date().toISOString(),
          details,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => storageUtils.getSecure(name),
        setItem: (name, value) => storageUtils.setSecure(name, value),
        removeItem: (name) => storageUtils.remove(name),
      })),
      partialize: (state) => ({
        // Only persist essential auth state
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
        deviceFingerprint: state.deviceFingerprint,
        onboardingStep: state.onboardingStep,
        onboardingData: state.onboardingData,
        isOnboardingComplete: state.isOnboardingComplete,
      }),
    }
  )
);

// Auth state selectors for optimal re-renders
export const useAuthUser = () => useAuth((state) => state.user);
export const useAuthSession = () => useAuth((state) => state.session);
export const useAuthLoading = () => useAuth((state) => state.isLoading);
export const useAuthError = () => useAuth((state) => state.error);
export const useIsAuthenticated = () =>
  useAuth((state) => state.isAuthenticated);
export const useOnboardingState = () =>
  useAuth((state) => ({
    step: state.onboardingStep,
    data: state.onboardingData,
    isComplete: state.isOnboardingComplete,
  }));

// Initialize auth on app start
if (typeof window !== "undefined") {
  useAuth.getState().initialize();
}