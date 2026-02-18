import { useState } from "react";
import type { ChangeEvent } from "react";
import type * as React from "react";
import hiddenIcon from "../../assets/images/hidden.png";
import shownIcon from "../../assets/images/shown.png";
import { validate } from "../../utils/validation";
import type { FormValues, FormErrors } from "../../utils/validation";

const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
};

const initialTouched = {
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreed: false,
};

export function ControlledForm() {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState(initialTouched);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        const field = name as keyof FormValues;

        // Update values and re-validate only the edited field
        setValues((v) => {
            const updated = { ...v, [field]: type === "checkbox" ? checked : value };
            const fieldErrors = validate(updated);

            setErrors((prev) => {
                const next = { ...prev };
                if (fieldErrors[field]) next[field] = fieldErrors[field];
                else delete next[field];
                return next;
            });

            return updated;
        });

        setTouched((t) => ({ ...t, [field]: true }));
        if (submitted) setSubmitted(false);
    };

    const handleBlur = (field: keyof FormValues) => {
        setTouched((t) => ({ ...t, [field]: true }));
    };

    // Decide if an error should be shown for a field
    const showError = (field: keyof FormValues) => 
        errors[field] && (touched[field] || submitAttempted);

    // Toggle password/confirm visibility
    const toggleVisibility = (field: "password" | "confirmPassword") => {
        setShowPassword((v) => ({ ...v, [field]: !v[field] }));
    };

    const errorId = (field: keyof FormValues) => `c-${field}-error`;

    // Build className for inputs based on error state
    const inputClass = (field: keyof FormValues, extra = "") => {
        const invalid = showError(field);
        const errorClasses = invalid ? "border-b-red-500 focus:border-b-red-500" : "";
        return `${extra} ${errorClasses}`.trim();
    };

    // Shared accessibility/error attrs for inputs
    const invalidAttrs = (field: keyof FormValues) => {
        const invalid = showError(field);
        return {
            "aria-invalid": invalid || undefined,
            "data-invalid": invalid ? "true" : undefined,
            "aria-describedby": errorId(field),
        } as const;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitAttempted(true);

        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length) {
            return; // Block submit when errors exist
        }

        setSubmitted(true);
        setTouched(initialTouched);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="c-username">Username*</label>
                <input
                    id="c-username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={() => handleBlur("username")}
                    placeholder="Enter your username"
                    required
                    className={inputClass("username")}
                    {...invalidAttrs("username")}
                />
                <p id={errorId("username")} className="text-red-600 text-xs min-h-[20px]" aria-live="polite">
                    {showError("username") ? errors.username : ""}
                </p>
            </div>

            <div>
                <label htmlFor="c-email">Email*</label>
                <input
                    id="c-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="Enter your email"
                    required
                    className={inputClass("email")}
                    {...invalidAttrs("email")}
                />
                <p id={errorId("email")} className="text-red-600 text-sm min-h-[20px]" aria-live="polite">
                    {showError("email") ? errors.email : ""}
                </p>
            </div>

            <div>
                <label htmlFor="c-password">Password*</label>
                <div className="relative">
                    <input
                        id="c-password"
                        name="password"
                        type={showPassword.password ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur("password")}
                        placeholder="Enter your password"
                        required
                        className={inputClass("password", "pr-12")}
                        {...invalidAttrs("password")}
                    />
                    <button
                        type="button"
                        aria-label={showPassword.password ? "Hide password" : "Show password"}
                        onClick={() => toggleVisibility("password")}
                        className="absolute inset-y-0 right-3 flex items-center"
                    >
                        <img
                            src={showPassword.password ? shownIcon : hiddenIcon}
                            alt=""
                            className="h-5 w-5"
                        />
                    </button>
                </div>
                <p id={errorId("password")} className="text-red-600 text-sm min-h-[20px]" aria-live="polite">
                    {showError("password") ? errors.password : ""}
                </p>
            </div>

            <div>
                <label htmlFor="c-confirm">Confirm password*</label>
                <div className="relative">
                    <input
                        id="c-confirm"
                        name="confirmPassword"
                        type={showPassword.confirmPassword ? "text" : "password"}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={() => handleBlur("confirmPassword")}
                        placeholder="Confirm your password"
                        required
                        className={inputClass("confirmPassword", "pr-12")}
                        {...invalidAttrs("confirmPassword")}
                    />
                    <button
                        type="button"
                        aria-label={showPassword.confirmPassword ? "Hide password" : "Show password"}
                        onClick={() => toggleVisibility("confirmPassword")}
                        className="absolute inset-y-0 right-3 flex items-center"
                    >
                        <img
                            src={showPassword.confirmPassword ? shownIcon : hiddenIcon}
                            alt=""
                            className="h-5 w-5"
                        />
                    </button>
                </div>
                <p id={errorId("confirmPassword")} className="text-red-600 text-sm min-h-[20px]" aria-live="polite">
                    {showError("confirmPassword") ? errors.confirmPassword : ""}
                </p>
            </div>

            <div className="space-y-4">
                <label className="flex items-center gap-2 m-0">
                    <input
                        id="c-agreed"
                        name="agreed"
                        type="checkbox"
                        checked={values.agreed}
                        onChange={handleChange}
                        onBlur={() => handleBlur("agreed")}
                        {...invalidAttrs("agreed")}
                    />
                    I agree to the terms and conditions.
                </label>

                <p id={errorId("agreed")} className="text-red-600 text-sm min-h-[25px] mb-2" aria-live="polite">
                    {showError("agreed") ? errors.agreed : ""}
                </p>

                <button type="submit" className="block bg-[#00AE1C] text-white w-full px-4 py-2 rounded-md hover:bg-[#009E1B] cursor-pointer">Register</button>

                <p className="text-sm text-white">*Required fields</p>

                <p className="text-green-500 text-sm text-center min-h-[10px]" aria-live="polite">
                    {submitted ? "Form submitted successfully." : "\u00a0"}
                </p>
            </div>
        </form>
    );
}