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
    };

    const handleBlur = (field: keyof FormValues) => {
        setTouched((t) => ({ ...t, [field]: true }));
    };

    const showError = (field: keyof FormValues) => 
        errors[field] && (touched[field] || submitAttempted);

    const toggleVisibility = (field: "password" | "confirmPassword") => {
        setShowPassword((v) => ({ ...v, [field]: !v[field] }));
    };

    const inputClass = (field: keyof FormValues, extra = "") => {
        const invalid = showError(field);
        const errorClasses = invalid ? "border-b-red-500 focus:border-b-red-500" : "";
        return `${extra} ${errorClasses}`.trim();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitAttempted(true);

        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length) {
            return;
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
                />
                <p className="text-red-600 text-xs">
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
                />
                <p className="text-red-600 text-sm min-h-[20px]">
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
                <p className="text-red-600 text-sm min-h-[20px]">
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

            </div>

            <label className="flex items-center gap-2">
                <input
                    id="c-agreed"
                    name="agreed"
                    type="checkbox"
                    checked={values.agreed}
                    onChange={handleChange}
                    onBlur={() => handleBlur("agreed")}
                />
                I agree to the terms and conditions.
            </label>

            <button type="submit" className="block mx-auto bg-[#00AE1C] text-white w-full px-4 py-2 rounded-md">Register</button>

            {submitted && (
                <p className="text-green-500 text-sm text-center">Form submitted successfully.</p>
            )}

            <p className="text-sm text-white">*Required fields</p>
        </form>
    );
}