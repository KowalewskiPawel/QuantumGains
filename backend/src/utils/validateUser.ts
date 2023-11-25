import { User } from "../types";

export const validateUser = (user: User): string | null => {
  // Check for username
  if (!user.username) {
    return "Username is required.";
  }
  if (user.username.length < 4) {
    return "Username must be at least 4 characters long.";
  }

  // Check for email
  if (!user.email) {
    return "Email is required.";
  }
  const emailParts = user.email.split("@");
  if (emailParts.length !== 2 || emailParts[1].split(".").length < 2) {
    return "Invalid email format.";
  }

  // Check for password
  if (!user.password) {
    return "Password is required.";
  }
  if (user.password.length < 4) {
    return "Password must be at least 4 characters long.";
  }

  // Check for confirmPassword
  if (!user.confirmPassword) {
    return "Confirm password is required.";
  }
  if (user.password !== user.confirmPassword) {
    return "Passwords do not match.";
  }

  return null; // If everything is valid
};
