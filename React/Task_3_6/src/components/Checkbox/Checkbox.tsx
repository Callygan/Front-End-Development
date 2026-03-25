import type {CheckboxProps } from './Checkbox.types'

const baseStyle = 'flex gap-2'

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
    return (
        <div className={baseStyle}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-white border-gray-300 accent-emerald-600"
            />
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </div>
    )
}