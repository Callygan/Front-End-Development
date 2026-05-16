import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dropdown } from './Dropdown'
import type { DropdownProps } from './Dropdown.types'

const mockOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
]

const renderDropdown = (props: Partial<DropdownProps> = {}) =>
    render(<Dropdown options={mockOptions} selectedValue="apple" {...props} />)

describe('Dropdown', () => {

    it('renders without crashing', () => {
        renderDropdown()
        expect(screen.getByText('apple')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        renderDropdown({ label: 'Fruit' })
        expect(screen.getByText('Fruit')).toBeInTheDocument()
    })

    it('does not show options initially', () => {
        renderDropdown()
        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
        expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })

    it('shows options when trigger clicked', async () => {
        renderDropdown()

        await userEvent.click(screen.getByAltText('Arrow Icon'))

        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()
        expect(screen.getByText('Cherry')).toBeInTheDocument()
    })

    it('calls onChange with correct value when option clicked', async () => {
        const handleChange = jest.fn()
        renderDropdown({ onChange: handleChange })

        await userEvent.click(screen.getByAltText('Arrow Icon'))
        await userEvent.click(screen.getByText('Banana'))

        expect(handleChange).toHaveBeenCalledWith('banana')
    })

    it('closes dropdown after option selected', async () => {
        renderDropdown({ onChange: jest.fn() })

        await userEvent.click(screen.getByAltText('Arrow Icon'))
        await userEvent.click(screen.getByText('Banana'))

        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    })

    it('closes dropdown when clicking outside', async () => {
        renderDropdown()

        await userEvent.click(screen.getByAltText('Arrow Icon'))
        expect(screen.getByText('Apple')).toBeInTheDocument()

        fireEvent.mouseDown(document.body)

        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    })

    it('displays selectedValue in trigger', () => {
        renderDropdown({ selectedValue: 'banana' })
        expect(screen.getByText('banana')).toBeInTheDocument()
    })
})