import type { ButtonProps } from './Button.types'
import PlayButtonBlack from '../../assets/icons/play_black.png'
import PlayButtonWhite from '../../assets/icons/play_white.png'

const baseStyle = 'inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed'

const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600 active:bg-[#0CD52B] disabled:bg-green-700',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-[#DEDFE5] active:bg-[#DEDFE5] disabled:bg-[#C8C8C8] disabled:text-[#737373] disabled:border-[#8D8E91]',
}

export const Button = ({ variant = 'primary', disabled, icon, children, onClick }: ButtonProps) => {
    const playIcon = variant === 'primary' ? PlayButtonWhite : PlayButtonBlack

    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]}`}
            disabled={disabled}
            onClick={onClick}
        >
            {icon && <img src={playIcon} alt="icon" className="w-4 h-4 block object-contain" />}
            {children}
        </button>
    )
}