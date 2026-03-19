export interface ColorPickerProps {
    label?: string
    colors: string[] // Array of color hex codes or names
    selectorColor: string // Currently selected color
    onChange?: (color: string) => void
}