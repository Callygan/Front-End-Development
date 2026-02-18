import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type * as React from "react";
import hiddenIcon from "../../assets/images/hidden.png";
import shownIcon from "../../assets/images/shown.png";
import { validate } from "../../utils/validation";
import type { FormValues, FormErrors } from "../../utils/validation";

export function UncontrolledForm() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    // Clear all validity flags and custom errors on the whole form
    const clearValidity = () => {
        const form = formRef.current;
        if (!form) return;
        Array.from(form.elements).forEach((el) => {
            if ("setCustomValidity" in el) {
                const inputEl = el as HTMLInputElement;
                inputEl.setCustomValidity("");
                inputEl.dataset.invalid = "";
                inputEl.setAttribute("aria-invalid", "false");
            }
        });
    };

    // Clear a single field validity + tracked error and hide success state
    const clearFieldValidity = (field: keyof FormValues, target?: HTMLInputElement | null) => {
        const el = target ?? (formRef.current?.elements.namedItem(field) as HTMLInputElement | null);
        if (el && "setCustomValidity" in el) {
            el.setCustomValidity("");
            el.dataset.invalid = "";
            el.setAttribute("aria-invalid", "false");
        }
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
        if (submitted) setSubmitted(false);
    };

    // Associate the error message with the input field (HTML5 constraint validation API)
    const setFieldError = (name: keyof FormValues, message?: string) => {
        const form = formRef.current;
        if (!form) return;
        const el = form.elements.namedItem(name) as HTMLInputElement | null;
        if (el && typeof el.setCustomValidity === "function") {
            el.setCustomValidity(message ?? "");
            el.dataset.invalid = message ? "true" : "";
            el.setAttribute("aria-invalid", message ? "true" : "false");
        }
    };

    // Handle submit using FormData, sync custom validity, and block on errors
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = formRef.current;
        if (!form) return;

        clearValidity();
        setErrors({});

        const fd = new FormData(form);
        const values: FormValues = {
            username: (fd.get("username") ?? "").toString(),
            email: (fd.get("email") ?? "").toString(),
            password: (fd.get("password") ?? "").toString(),
            confirmPassword: (fd.get("confirmPassword") ?? "").toString(),
            agreed: fd.get("agreed") === "on",
        };

        const errors = validate(values);
        setErrors(errors);

        // Set the error messages for each field
        (Object.keys(errors) as Array<keyof FormValues>).forEach((field) => {
            setFieldError(field, errors[field]);
        });

        if (Object.keys(errors).length) {
            form.reportValidity(); // Show the error messages
            return;
        }

        setSubmitted(true);
        setErrors({});
    };

    // Clear errors/validity on each change for the edited field
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name as keyof FormValues;
        clearFieldValidity(field, event.target);
    };

    // Toggle password/confirm visibility
    const toggleVisibility = (field: "password" | "confirmPassword") => {
        setShowPassword((v) => ({ ...v, [field]: !v[field] }));
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="u-username">Username*</label>
                <input
                    id="u-username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    onChange={handleChange}
                    aria-describedby="u-username-error"
                />
                <p id="u-username-error" className="text-red-600 text-xs min-h-[20px]" aria-live="polite">
                    {errors.username ?? ""}
                </p>
            </div>
            <div>
                <label htmlFor="u-email">Email*</label>
                <input
                    id="u-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                    aria-describedby="u-email-error"
                />
                <p id="u-email-error" className="text-red-600 text-sm min-h-[20px]" aria-live="polite">
                    {errors.email ?? ""}
                </p>
            </div>
            <div>
                <label htmlFor="u-password">Password*</label>
                <div className="relative">
                    <input
                        id="u-password"
                        name="password"
                        type={showPassword.password ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="pr-12"
                        onChange={handleChange}
                        aria-describedby="u-password-error"
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
                <p id="u-password-error" className="text-red-600 text-sm min-h-[20px]" aria-live="polite">
                    {errors.password ?? ""}
                </p>
            </div>
            <div>
                <label htmlFor="u-confirm-password">Confirm Password*</label>
                <div className="relative">
                    <input
                        id="u-confirm-password"
                        name="confirmPassword"
                        type={showPassword.confirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        required
                        className="pr-12"
                        onChange={handleChange}
                        aria-describedby="u-confirmPassword-error"
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
                <p id="u-confirmPassword-error" className="text-red-600 text-sm min-h-[20px]" aria-live="polite">
                    {errors.confirmPassword ?? ""}
                </p>
            </div>

            <div className="space-y-4">
                <label className="flex items-center gap-2 m-0">
                    <input id="u-agreed" name="agreed" type="checkbox" onChange={handleChange} aria-describedby="u-agreed-error" />
                    I agree to the terms and conditions.
                </label>

                <p id="u-agreed-error" className="text-red-600 text-sm min-h-[25px] mb-2" aria-live="polite">
                    {errors.agreed ?? ""}
                </p>

                <button type="submit" className="block mx-auto bg-[#00AE1C] text-white w-full px-4 py-2 rounded-md hover:bg-[#009E1B] cursor-pointer">Register</button>

                <p className="text-sm text-white"> *Required fields</p>

                <p className="text-green-500 text-sm text-center min-h-[20px]" aria-live="polite">
                    {submitted ? "Form submitted successfully." : "\u00a0"}
                </p>
            </div>
        </form>
    );
}