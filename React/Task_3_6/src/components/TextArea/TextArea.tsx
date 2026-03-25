import type { TextAreaProps } from './TextArea.types'

const baseStyle = 'w-82 py-2 border-b border-gray-400 focus:outline-none focus:border-gray-800 transition-colors duration-200 resize-none'

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