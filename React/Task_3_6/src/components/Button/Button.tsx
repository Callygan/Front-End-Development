import type { ButtonProps } from './Button.types'

const baseStyle = 'inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 cursor-pointer'

const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-white text-gray-700 border border-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
}
export const Button = ({ variant='primary', disabled, icon, children, onClick }: ButtonProps) => {
    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]}`}
            disabled={disabled}
            onClick={onClick}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    )
}