export interface TextAreaProps {
    label?: string
    placeholder?: string
    value?: string
    rows?: number
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}