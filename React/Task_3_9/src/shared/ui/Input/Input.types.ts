export interface InputProps {
    label?: string
    type?: string
    placeholder?: string
    value?: string
    disabled?: boolean
    error?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void   
}