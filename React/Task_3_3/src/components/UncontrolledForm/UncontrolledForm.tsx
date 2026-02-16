import { useRef, useState } from "react";
import type * as React from "react";
import hiddenIcon from "../../assets/images/hidden.png";
import shownIcon from "../../assets/images/shown.png";
import { validate } from "../../utils/validation";
import type { FormValues } from "../../utils/validation";

export function UncontrolledForm() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [submitted, setSubmitted] = useState(false);

    //Delete the error message when the user changes the input
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

    //Asociate the error message with the input field (HTML5 constraint validation API)
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = formRef.current;
        if (!form) return;

        clearValidity();

        const fd = new FormData(form);
        const values: FormValues = {
            username: (fd.get("username") ?? "").toString(),
            email: (fd.get("email") ?? "").toString(),
            password: (fd.get("password") ?? "").toString(),
            confirmPassword: (fd.get("confirmPassword") ?? "").toString(),
            agreed: fd.get("agreed") === "on",
        };

        const errors = validate(values);

        //Set the error messages for each field
        (Object.keys(errors) as Array<keyof FormValues>).forEach((field) => {
            setFieldError(field, errors[field]);
        });

        if (Object.keys(errors).length) {
            form.reportValidity(); // Show the error messages
            return;
        }

        setSubmitted(true);
    };

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
                />
            </div>
            <div>
                <label htmlFor="u-email">Email*</label>
                <input
                    id="u-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
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
                <input id="u-agreed" name="agreed" type="checkbox" />
                I agree to the terms and conditions.
            </label>

            <button type="submit" className="block mx-auto bg-[#00AE1C] text-white w-full px-4 py-2 rounded-md">Register</button>

            {submitted && (
                <p className="text-green-500 text-sm text-center">Form submitted successfully.</p>
            )}

            <p className="text-sm text-white"> *Required fields</p>
        </form>
    );
}