export interface ColorPickerProps {
    label?: string
    colors: string[] // Array of color hex codes or names
    selectedColor: string // Currently selected color
    onChange?: (color: string) => void
}