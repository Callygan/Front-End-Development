import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'
import type { CheckboxProps } from './Checkbox.types'

const renderCheckbox = (props: Partial<CheckboxProps> = {}) =>
    render(<Checkbox checked={false} onChange={jest.fn()} {...props} />)

describe('Checkbox', () => {

    it('renders without crashing', () => {
        renderCheckbox()
        expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders as unchecked when checked=false', () => {
        renderCheckbox({ checked: false })
        expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('renders as checked when checked=true', () => {
        renderCheckbox({ checked: true })
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('calls onChange when clicked', async () => {
        const handleChange = jest.fn()
        renderCheckbox({ onChange: handleChange })

        await userEvent.click(screen.getByRole('checkbox'))

        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('renders label when provided', () => {
        renderCheckbox({ label: 'Accept Terms' })
        expect(screen.getByText('Accept Terms')).toBeInTheDocument()
    })

    it('does not render label when not provided', () => {
        renderCheckbox()
        expect(screen.queryByText('Accept Terms')).not.toBeInTheDocument()
    })
})