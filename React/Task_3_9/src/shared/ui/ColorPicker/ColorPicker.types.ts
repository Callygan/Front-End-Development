export interface ColorPickerProps {
    label?: string
    colors: string[]
    selectedColor: string
    onChange?: (color: string) => void
}