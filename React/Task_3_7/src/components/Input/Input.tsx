import { useState } from 'react'
import type { InputProps } from './Input.types'
import eyeOpen from '../../assets/icons/eye-line-icon.png'
import eyeClosed from '../../assets/icons/eye-close-line-icon.png'

const baseStyle = 'w-full px-3 py-2 border-b border-[#737373] focus:outline-none focus:border-b-[#323749] transition-colors duration-200'

export const Input = ({ label, type = 'text', placeholder, value, disabled, error, onChange }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className={`text-sm font-medium text-gray-700 ${disabled ? 'opacity-60' : ''}`}>{label}</label>
            )}
            <div className="relative">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    className={`
                        ${baseStyle}
                        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
                        ${disabled ? 'opacity-60 bg-gray-100 cursor-not-allowed' : ''}
                        ${isPassword ? 'pr-10' : ''}
                    `}
                    onChange={onChange}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                        <img
                            src={showPassword ? eyeOpen : eyeClosed}
                            alt="toggle password"
                            className="w-4 h-4"
                        />
                    </button>
                )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}