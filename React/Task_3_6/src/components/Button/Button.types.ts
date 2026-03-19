export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps {
    variant?: ButtonVariant
    disabled?: boolean
    icon?: React.ReactNode
    children: React.ReactNode
    onClick?: () => void
}