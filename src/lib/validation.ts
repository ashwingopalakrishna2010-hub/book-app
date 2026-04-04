// Validation utility functions for form inputs

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns Error message if invalid, null if valid
 */
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns Error message if invalid, null if valid
 */
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
};

/**
 * Validates display name (for sign up)
 * @param displayName - Display name string to validate
 * @returns Error message if invalid, null if valid
 */
export const validateDisplayName = (displayName: string): string | null => {
  if (!displayName.trim()) {
    return "Name is required";
  }
  if (displayName.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
};

/**
 * Validates all fields for login form
 * @param email - Email field value
 * @param password - Password field value
 * @returns Error message if any field is invalid, null if all valid
 */
export const validateLoginForm = (email: string, password: string): string | null => {
  const emailError = validateEmail(email);
  if (emailError) return emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;
  
  return null;
};

/**
 * Validates all fields for sign up form
 * @param email - Email field value
 * @param password - Password field value
 * @param displayName - Display name field value
 * @returns Error message if any field is invalid, null if all valid
 */
export const validateSignUpForm = (email: string, password: string, displayName: string): string | null => {
  const emailError = validateEmail(email);
  if (emailError) return emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;
  
  const nameError = validateDisplayName(displayName);
  if (nameError) return nameError;
  
  return null;
};