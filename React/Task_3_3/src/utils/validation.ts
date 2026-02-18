export type FormValues = {
    username : string;
    email : string;
    password : string;
    confirmPassword : string;
    agreed : boolean;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

// Basic synchronous validation for both controlled and uncontrolled forms
export const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const username = values.username.trim(); // strip surrounding spaces
    if (!username) {
        errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9]+$/.test(username)) {
        errors.username = "Only letters and numbers allowed";
    } else if (username.length < 3) {
        errors.username = "Must be at least 3 characters";
    }
    if (!values.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(values.email.trim())) errors.email = "Invalid email format";

    if(!values.password) errors.password = "Password is required";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";

    if (!values.confirmPassword) errors.confirmPassword = "Confirm Password is required";
    else if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords do not match";

    if (!values.agreed) errors.agreed = "You must agree to the terms";

    return errors;
}