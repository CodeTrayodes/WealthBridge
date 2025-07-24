/* ------------------------- Rate Limiting ------------------------- */

const rateLimitStore = new Map();

export class RateLimiter {
  constructor(config) {
    this.config = config;
  }

  check(identifier) {
    const now = Date.now();
    const key = `rate_limit:${identifier}`;
    const existing = rateLimitStore.get(key);

    if (existing && now > existing.resetTime) {
      rateLimitStore.delete(key);
    }

    const current = rateLimitStore.get(key) || {
      count: 0,
      resetTime: now + this.config.windowMs,
    };

    return {
      limit: this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - current.count),
      reset: new Date(current.resetTime),
      retryAfter:
        current.count >= this.config.maxRequests
          ? Math.ceil((current.resetTime - now) / 1000)
          : undefined,
    };
  }

  increment(identifier) {
    const now = Date.now();
    const key = `rate_limit:${identifier}`;
    const existing = rateLimitStore.get(key);

    if (existing && now > existing.resetTime) {
      rateLimitStore.delete(key);
    }

    const current = rateLimitStore.get(key) || {
      count: 0,
      resetTime: now + this.config.windowMs,
    };

    if (current.count >= this.config.maxRequests) {
      return false;
    }

    current.count++;
    rateLimitStore.set(key, current);
    return true;
  }

  reset(identifier) {
    rateLimitStore.delete(`rate_limit:${identifier}`);
  }
}

export const loginRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
});

export const signupRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000,
  maxRequests: 3,
});

export const passwordResetRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000,
  maxRequests: 3,
});

/* ----------------------- Password Utils ------------------------ */

function hasWeakPatterns(password) {
  const weakPatterns = [
    /123456|654321/,
    /qwerty|asdfgh|zxcvbn/i,
    /password|admin|user|login/i,
    /(.)\1{2,}/,
  ];
  return weakPatterns.some((pattern) => pattern.test(password));
}

function hasRepeatedChars(password) {
  return /(.)\1{2,}/.test(password);
}

export const passwordUtils = {
  isStrong(password) {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^a-zA-Z0-9]/.test(password) &&
      !hasWeakPatterns(password)
    )
  },

  getStrengthScore(password) {
    let score = 0;

    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;

    if (hasWeakPatterns(password)) score -= 20;
    if (hasRepeatedChars(password)) score -= 10;

    return Math.max(0, Math.min(100, score));
  },

  getStrengthFeedback(password) {
    const feedback = [];

    if (password.length < 8) feedback.push('Use at least 8 characters');
    if (!/[a-z]/.test(password)) feedback.push('Add lowercase letters');
    if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters');
    if (!/[0-9]/.test(password)) feedback.push('Add numbers');
    if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Add special characters');
    if (hasWeakPatterns(password)) feedback.push('Avoid common patterns');
    if (hasRepeatedChars(password)) feedback.push('Avoid repeated characters');

    return feedback;
  },
};

/* ------------------------ Email Utils ------------------------ */

export const emailUtils = {
  isValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  getDomain(email) {
    return email.split('@')[1]?.toLowerCase() || '';
  },

  isProfessionalDomain(email) {
    const domain = this.getDomain(email);
    const disposableDomains = [
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com',
      'throwaway.email',
    ];
    return !disposableDomains.includes(domain);
  },

  normalize(email) {
    return email.toLowerCase().trim();
  },
};

/* ------------------------ Phone Utils ------------------------ */

export const phoneUtils = {
  isValid(phone) {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  },

  format(phone) {
    if (!phone.startsWith('+')) return phone;

    if (phone.startsWith('+1')) {
      const match = phone.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
      return match ? `+1 (${match[1]}) ${match[2]}-${match[3]}` : phone;
    } else if (phone.startsWith('+91')) {
      const match = phone.match(/^\+91(\d{5})(\d{5})$/);
      return match ? `+91 ${match[1]} ${match[2]}` : phone;
    }

    return phone;
  },

  getCountryCode(phone) {
    if (!phone.startsWith('+')) return '';

    const codes = ['+1', '+44', '+91', '+86', '+81', '+49', '+33', '+61', '+971'];
    for (const code of codes) {
      if (phone.startsWith(code)) return code;
    }

    const match = phone.match(/^\+(\d{1,3})/);
    return match ? `+${match[1]}` : '';
  },
};

/* ---------------------- Device Utils ------------------------ */

export const deviceUtils = {
  generateFingerprint() {
    if (typeof window === 'undefined') return 'server';

    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.platform,
      navigator.cookieEnabled ? '1' : '0',
    ];

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Device fingerprint', 2, 2);
        components.push(canvas.toDataURL());
      }
    } catch {
      components.push('canvas-blocked');
    }

    const fingerprint = components.join('|');
    return btoa(fingerprint).slice(0, 32);
  },

  getDeviceInfo() {
    if (typeof window === 'undefined') {
      return {
        type: 'server',
        os: 'unknown',
        browser: 'unknown',
        isMobile: false,
      };
    }

    const userAgent = navigator.userAgent;

    return {
      type: getDeviceType(userAgent),
      os: getOS(userAgent),
      browser: getBrowser(userAgent),
      isMobile: /Mobile|Android|iPhone|iPad/.test(userAgent),
    };
  },
};

function getDeviceType(userAgent) {
  if (/Mobile|Android|iPhone/.test(userAgent)) return 'mobile';
  if (/iPad|Tablet/.test(userAgent)) return 'tablet';
  return 'desktop';
}

function getOS(userAgent) {
  if (/Windows/.test(userAgent)) return 'Windows';
  if (/Mac OS X/.test(userAgent)) return 'macOS';
  if (/Linux/.test(userAgent)) return 'Linux';
  if (/Android/.test(userAgent)) return 'Android';
  if (/iPhone|iPad/.test(userAgent)) return 'iOS';
  return 'unknown';
}

function getBrowser(userAgent) {
  if (/Chrome/.test(userAgent)) return 'Chrome';
  if (/Firefox/.test(userAgent)) return 'Firefox';
  if (/Safari/.test(userAgent)) return 'Safari';
  if (/Edge/.test(userAgent)) return 'Edge';
  return 'unknown';
}

/* --------------------- Security Utils --------------------- */

export const securityUtils = {
  isSuspiciousLogin(user, deviceFingerprint) {
    return false;
  },

  generateSecureToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    return result;
  },

  async hashData(data) {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  },

  sanitizeInput(input) {
    return input
      .trim()
      .replace(/[<>'"&]/g, '')
      .substring(0, 1000);
  },

  isTrustedOrigin(origin) {
    const trustedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://wealthbridge.com',
      'https://app.wealthbridge.com',
    ];

    return trustedOrigins.includes(origin);
  },
};

/* ------------------------ Error Utils ------------------------ */

export const errorUtils = {
  createAuthError(code, message, details) {
    return { code, message, details };
  },

  getUserFriendlyMessage(error) {
    const messages = {
      INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
      USER_NOT_FOUND: 'No account found with this email address.',
      EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
      INVALID_TOKEN: 'Invalid or expired verification link.',
      TOKEN_EXPIRED: 'This link has expired. Please request a new one.',
      MFA_REQUIRED: 'Two-factor authentication is required.',
      MFA_INVALID: 'Invalid verification code. Please try again.',
      ACCOUNT_LOCKED: 'Your account has been temporarily locked due to multiple failed login attempts.',
      ACCOUNT_SUSPENDED: 'Your account has been suspended. Please contact support.',
      EMAIL_NOT_VERIFIED: 'Please verify your email address before signing in.',
      WEAK_PASSWORD: 'Password does not meet security requirements.',
      RATE_LIMITED: 'Too many attempts. Please wait before trying again.',
      DEVICE_NOT_TRUSTED: 'This device is not recognized. Please verify your identity.',
      ONBOARDING_INCOMPLETE: 'Please complete your profile setup.',
      KYC_REQUIRED: 'Identity verification is required to continue.',
      UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    };

    return messages[error.code] || error.message;
  },

  isRetryableError(error) {
    const retryableCodes = [
      'UNKNOWN_ERROR',
      'RATE_LIMITED',
    ];

    return retryableCodes.includes(error.code);
  },
};

/* ------------------------ Session Utils ------------------------ */

export const sessionUtils = {
  isExpired(expiresAt) {
    return new Date().getTime() >= expiresAt.getTime();
  },

  needsRefresh(expiresAt) {
    const fiveMinutes = 5 * 60 * 1000;
    return new Date().getTime() >= expiresAt.getTime() - fiveMinutes;
  },

  getTimeRemaining(expiresAt) {
    const remaining = expiresAt.getTime() - new Date().getTime();
    return Math.max(0, Math.floor(remaining / (60 * 1000)));
  },
};

/* ------------------------ Storage Utils ------------------------ */

export const storageUtils = {
  setSecure(key, value) {
    if (typeof window === 'undefined') return;
    try {
      const encrypted = btoa(JSON.stringify(value));
      localStorage.setItem(`wb_${key}`, encrypted);
    } catch (error) {
      console.warn('Failed to store data:', error);
    }
  },

  getSecure(key) {
    if (typeof window === 'undefined') return null;
    try {
      const encrypted = localStorage.getItem(`wb_${key}`);
      if (!encrypted) return null;
      return JSON.parse(atob(encrypted));
    } catch (error) {
      console.warn('Failed to retrieve data:', error);
      return null;
    }
  },

  remove(key) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`wb_${key}`);
  },

  clearAll() {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('wb_')) localStorage.removeItem(key);
    });
  },
};