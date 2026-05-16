import type { LinkProps } from './Link.types'

const baseStyle = 'text-sm font-medium transition-all duration-200'
const activeStyle = 'text-green-500 hover:underline hover:text-green-600 active:text-green-400 cursor-pointer'
const disabledStyle = 'text-[#575D58] cursor-not-allowed pointer-events-none'

export const Link = ({ disabled, href, children, onClick }: LinkProps) => {
    return (
        <a
            className={`${baseStyle} ${disabled ? disabledStyle : activeStyle}`}
            href={disabled ? undefined : href}
            aria-disabled={disabled}
            onClick={disabled ? (e) => e.preventDefault() : onClick}
        >
            {children}
        </a>
    )
}