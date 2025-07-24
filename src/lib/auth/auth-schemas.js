// src/lib/auth/auth-schemas.js
import { z } from 'zod';
import {
  AuthProvider,
  MFAMethod,
  CitizenshipStatus,
  IncomeRange,
  ExperienceLevel,
  RiskTolerance,
  FinancialGoal,
  PortfolioSize,
  InvestmentType
} from './auth-types';

// Password validation - enterprise grade security
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
  .refine((password) => {
    // Check for common weak patterns
    const weakPatterns = [
      /^(.)\1+$/, // All same character
      /123456|654321/, // Sequential numbers
      /qwerty|asdfgh/, // Keyboard patterns
      /password|admin|user/i, // Common words
    ];
    return !weakPatterns.some(pattern => pattern.test(password));
  }, 'Password is too weak or contains common patterns');

// Email validation with domain restrictions if needed
const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')
  .max(254, 'Email is too long')
  .refine((email) => {
    // Additional validation for professional domains (optional)
    const domain = email.split('@')[1]?.toLowerCase();
    // Could add domain blacklist/whitelist here
    return true;
  }, 'Email domain not allowed');

// Phone number validation with international support
const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid international phone number (+country code)')
  .min(8, 'Phone number is too short')
  .max(15, 'Phone number is too long');

// Full name validation
const fullNameSchema = z
  .string()
  .min(2, 'Full name must be at least 2 characters')
  .max(100, 'Full name must not exceed 100 characters')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Full name can only contain letters, spaces, hyphens, apostrophes, and periods')
  .refine((name) => name.trim().split(' ').length >= 2, 'Please enter your full name (first and last name)');

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
  mfaCode: z.string().optional(),
  deviceFingerprint: z.string().optional(),
});

// Sign Up Schema
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: fullNameSchema,
  phone: phoneSchema.optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  subscribeNewsletter: z.boolean().optional(),
  referralCode: z.string().max(20).optional(),
});

// Password Reset Schema
export const passwordResetSchema = z.object({
  email: emailSchema,
});

// Password Update Schema
export const passwordUpdateSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
  resetToken: z.string().optional(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// MFA Setup Schema
export const mfaSetupSchema = z.object({
  method: z.nativeEnum(MFAMethod),
  phoneNumber: phoneSchema.optional(),
  backupEmail: emailSchema.optional(),
}).refine((data) => {
  if (data.method === MFAMethod.SMS && !data.phoneNumber) {
    return false;
  }
  if (data.method === MFAMethod.EMAIL && !data.backupEmail) {
    return false;
  }
  return true;
}, {
  message: "Required field missing for selected MFA method",
  path: ["method"],
});

// MFA Verification Schema
export const mfaVerificationSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Verification code must be 6 digits'),
  method: z.nativeEnum(MFAMethod),
  backupCode: z.boolean().optional(),
});

// OAuth Sign In Schema
export const oauthSignInSchema = z.object({
  provider: z.nativeEnum(AuthProvider),
  redirectTo: z.string().url().optional(),
});

// Onboarding Step Schemas
export const personalInfoSchema = z.object({
  fullName: fullNameSchema,
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 && age <= 120;
  }, 'You must be at least 18 years old'),
  phoneNumber: phoneSchema,
  countryCode: z.string().length(2, 'Invalid country code'),
  preferredLanguage: z.string().min(2).max(5),
  profilePhoto: z.string().url().optional(),
});

export const locationDetailsSchema = z.object({
  currentCountry: z.string().length(2, 'Invalid country code'),
  currentCity: z.string().min(2).max(100),
  citizenshipStatus: z.nativeEnum(CitizenshipStatus),
  visaStatus: z.string().max(50).optional(),
  taxResidency: z.array(z.string().length(2)).min(1, 'Select at least one tax residency'),
  planToReturn: z.boolean().optional(),
  returnTimeframe: z.string().max(50).optional(),
});

export const financialProfileSchema = z.object({
  annualIncome: z.nativeEnum(IncomeRange),
  investmentExperience: z.nativeEnum(ExperienceLevel),
  riskTolerance: z.nativeEnum(RiskTolerance),
  financialGoals: z.array(z.nativeEnum(FinancialGoal)).min(1, 'Select at least one financial goal'),
  currentPortfolioSize: z.nativeEnum(PortfolioSize).optional(),
  preferredInvestments: z.array(z.nativeEnum(InvestmentType)).min(1, 'Select at least one investment type'),
});

export const securitySetupSchema = z.object({
  mfaEnabled: z.boolean(),
  mfaMethod: z.nativeEnum(MFAMethod).optional(),
  securityQuestions: z.array(z.object({
    question: z.string().min(10).max(200),
    answer: z.string().min(2).max(100),
  })).min(2).max(5).optional(),
  notificationPreferences: z.object({
    email: z.object({
      marketing: z.boolean(),
      security: z.boolean(),
      portfolio: z.boolean(),
      news: z.boolean(),
    }),
    sms: z.object({
      security: z.boolean(),
      alerts: z.boolean(),
    }),
    push: z.object({
      portfolio: z.boolean(),
      news: z.boolean(),
      security: z.boolean(),
    }),
  }),
});

export const kycPreparationSchema = z.object({
  documentsUploaded: z.boolean(),
  kycCallScheduled: z.boolean().optional(),
  complianceAcknowledged: z.boolean().refine(val => val === true, 'You must acknowledge compliance requirements'),
});

export const welcomeSetupSchema = z.object({
  dashboardTourCompleted: z.boolean().optional(),
  referralProgramJoined: z.boolean().optional(),
  newsletterSubscribed: z.boolean().optional(),
  externalAccountsConnected: z.array(z.string()).optional(),
});

// Complete Onboarding Schema
export const onboardingSchema = z.object({
  ...personalInfoSchema.shape,
  ...locationDetailsSchema.shape,
  ...financialProfileSchema.shape,
  ...securitySetupSchema.shape,
  ...kycPreparationSchema.shape,
  ...welcomeSetupSchema.shape,
});

// Profile Update Schema
export const profileUpdateSchema = z.object({
  fullName: fullNameSchema.optional(),
  phone: phoneSchema.optional(),
  preferredLanguage: z.string().optional(),
  profilePhoto: z.string().url().optional(),
  notificationPreferences: z.object({
    email: z.object({
      marketing: z.boolean(),
      security: z.boolean(),
      portfolio: z.boolean(),
      news: z.boolean(),
    }),
    sms: z.object({
      security: z.boolean(),
      alerts: z.boolean(),
    }),
    push: z.object({
      portfolio: z.boolean(),
      news: z.boolean(),
      security: z.boolean(),
    }),
  }).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be updated",
});

// Email Verification Schema
export const emailVerificationSchema = z.object({
  token: z.string().uuid('Invalid verification token'),
  email: emailSchema.optional(),
});

// Security Event Schema
export const securityEventSchema = z.object({
  type: z.string(),
  details: z.record(z.string(), z.any()).optional(),
  deviceFingerprint: z.string().optional(),
});

// Device Trust Schema
export const deviceTrustSchema = z.object({
  deviceFingerprint: z.string().min(1),
  trustDevice: z.boolean(),
  deviceName: z.string().max(100).optional(),
});

// Custom validation helpers
export const validateStrongPassword = (password) => {
  return passwordSchema.safeParse(password).success;
};

export const validateEmail = (email) => {
  return emailSchema.safeParse(email).success;
};

export const validatePhone = (phone) => {
  return phoneSchema.safeParse(phone).success;
};

// Password strength checker
export const getPasswordStrength = (password) => {
  let score = 0;
  const feedback = [];

  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('Add special characters');

  if (password.length >= 12) score += 1;
  if (!/(.)\1{2,}/.test(password)) score += 1; // No repeated characters

  return { score, feedback };
};

// Form validation utilities
export const getFieldError = (errors, fieldName) => {
  return errors?.[fieldName]?.message;
};

export const hasFieldError = (errors, fieldName) => {
  return !!errors?.[fieldName];
};