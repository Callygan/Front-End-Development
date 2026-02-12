import { useState } from "react";
import type { ChangeEvent } from "react";
import type * as React from "react";
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    };

    const handleBlur = (field: keyof FormValues) => {
        setTouched((t) => ({ ...t, [field]: true }));
    };

    const showError = (field: keyof FormValues) => 
        errors[field] && (touched[field] || submitAttempted);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitAttempted(true);

        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length) {
            return;
        }
    };

    const handleReset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched(initialTouched);
        setSubmitAttempted(false);
    };

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-3">
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
                />
                {showError("username") && (
                <p className="text-red-600 text-sm">{errors.username}</p>
                )}
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
                />
                {showError("email") && (
                <p className="text-red-600 text-sm">{errors.email}</p>
                )}
            </div>

            <div>
                <label htmlFor="c-password">Password*</label>
                <input
                    id="c-password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="Enter your password"
                    required
                />
                {showError("password") && (
                <p className="text-red-600 text-sm">{errors.password}</p>
                )}
            </div>

            <div>
                <label htmlFor="c-confirm">Confirm password*</label>
                <input
                    id="c-confirm"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Confirm your password"
                    required
                />
                {showError("confirmPassword") && (
                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
                )}
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
            {showError("agreed") && (
                <p className="text-red-600 text-sm">{errors.agreed}</p>
            )}

            <div className="flex gap-3">
                <button type="submit">Register</button>
                <button type="reset" className="text-sm text-slate-600">
                    Reset
                </button>
            </div>

            <p className="text-sm text-slate-500">*Required fields</p>
        </form>
    );
}