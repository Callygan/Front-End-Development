import type { TextAreaProps } from './TextArea.types'

const baseStyle = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'

export const TextArea = ({ label, placeholder, value, rows = 4, onChange } : TextAreaProps) => {
    return (
        <div className="mx-4">
            {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
            <textarea
                className={baseStyle}
                placeholder={placeholder}
                value={value}
                rows={rows}
                onChange={onChange}
            />
        </div>
    )
}