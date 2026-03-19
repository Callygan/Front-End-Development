import type { LinkProps } from './Link.types'

const baseStyle = 'inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 text-green-500 underline hover:text-green-600 active:text-green-700'

const disabledStyle = 'opacity-50 cursor-not-allowed pointer-events-none'

export const Link = ({ disabled, href, children, onClick }: LinkProps) => {
    return (
        <a 
            className={`${baseStyle} ${disabled ? disabledStyle : 'cursor-pointer'}`}
            href={href}
            aria-disabled={disabled}
            onClick={onClick}
        >
            {children}
        </a>
    )
}