import { useRef } from "react";
import type * as React from "react";
import { validate } from "../../utils/validation";
import type { FormValues } from "../../utils/validation";

export function UncontrolledForm() {
    const formRef = useRef<HTMLFormElement | null>(null);

    //Delete the error message when the user changes the input
    const clearValidity = () => {
        const form = formRef.current;
        if (!form) return;
        Array.from(form.elements).forEach((el) => {
            if ("setCustomValidity" in el) {
                (el as HTMLInputElement).setCustomValidity("");
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

        form.reset();
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col">
                <label htmlFor="u-username">Username*</label>
                <input
                    id="u-username"
                    name="username"
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="u-email">Email*</label>
                <input
                    id="u-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="u-password">Password*</label>
                <input
                    id="u-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="u-confirm-password">Confirm Password*</label>
                <input
                    id="u-confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                />
            </div>

            <label className="flex items-center gap-2">
                <input id="u-agreed" name="agreed" type="checkbox" />
                I agree to the terms and conditions.
            </label>

            <button type="submit">Register</button>

            <p className="text-sm text-slate-500"> *Required fields</p>
        </form>
    );
}