import type { InputProps } from './Input.types'

const baseStyle = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring'

export const Input = ({ label, type='text', placeholder, value, disabled, error, onChange }: InputProps) => {
    return (
        <div className="mx-4">
            {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                className={`${baseStyle} ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                onChange={onChange}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    )
}