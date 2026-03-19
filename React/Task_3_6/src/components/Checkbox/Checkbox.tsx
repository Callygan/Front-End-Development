import type {CheckboxProps } from './Checkbox.types'

const baseStyle = 'flex items-center gap-2'

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
    return (
        <div className={baseStyle}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </div>
    )
}