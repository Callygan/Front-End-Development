export type FormValues = {
    username : string;
    email : string;
    password : string;
    confirmPassword : string;
    agreed : boolean;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.username.trim()) errors.username = "Username is required";
    if (!values.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(values.email.trim())) errors.email = "Invalid email format";

    if(!values.password) errors.password = "Password is required";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";

    if (!values.confirmPassword) errors.confirmPassword = "Confirm Password is required";
    else if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords do not match";

    if (!values.agreed) errors.agreed = "You must agree to the terms";

    return errors;
}