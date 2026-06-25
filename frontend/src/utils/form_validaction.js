export const validateRegisterForm = (formData) => {
  const errors = {};

  // Name
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  // Username
  if (!formData.username.trim()) {
    errors.username = "Username is required";
  } else if (formData.username.trim().length < 4) {
    errors.username = "Username must be at least 4 characters";
  }

  // Mobile
  if (!formData.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = "Mobile number must be 10 digits";
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  // Designation
  if (!formData.designation) {
    errors.designation = "Please select a designation";
  }

  // Password
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // Confirm Password
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (
    formData.password !== formData.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};