import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorPicker } from './ColorPicker'
import type { ColorPickerProps } from './ColorPicker.types'

const mockColors = ['#ff0000', '#00ff00', '#0000ff']

const renderColorPicker = (props: Partial<ColorPickerProps> = {}) =>
    render(<ColorPicker colors={mockColors} selectedColor="#ff0000" {...props} />)

describe('ColorPicker', () => {

    it('renders without crashing', () => {
        renderColorPicker()
        expect(screen.getByText('Colour picked')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        renderColorPicker({ label: 'Pick a color' })
        expect(screen.getByText('Pick a color')).toBeInTheDocument()
    })

    it('does not render label when not provided', () => {
        renderColorPicker()
        expect(screen.queryByText('Pick a color')).not.toBeInTheDocument()
    })

    it('renders correct number of color swatches', () => {
        renderColorPicker()
        // each color appears twice — left (selectable) and right (preview)
        const redSwatches = document.querySelectorAll('[style*="background-color: rgb(255, 0, 0)"]')
        expect(redSwatches).toHaveLength(2)
    })

    it('calls onChange with correct color when swatch clicked', async () => {
        const handleChange = jest.fn()
        renderColorPicker({ onChange: handleChange })

        const swatches = document.querySelectorAll('[style*="background-color: rgb(0, 255, 0)"]')
        await userEvent.click(swatches[0])

        expect(handleChange).toHaveBeenCalledWith('#00ff00')
    })

    it('does not crash when onChange not provided', async () => {
        renderColorPicker()

        const swatches = document.querySelectorAll('[style*="background-color: rgb(0, 255, 0)"]')
        await userEvent.click(swatches[0])
    })

})