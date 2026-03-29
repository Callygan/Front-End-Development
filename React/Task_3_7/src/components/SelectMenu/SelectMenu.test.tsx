import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectMenu } from './SelectMenu'
import type { SelectMenuProps } from './SelectMenu.types'

const mockOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
]

const renderSelectMenu = (props: Partial<SelectMenuProps> = {}) =>
    render(<SelectMenu options={mockOptions} selectedValue="apple" {...props} />)

describe('SelectMenu', () => {

    it('renders without crashing', () => {
        renderSelectMenu()
        expect(screen.getByText('apple')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        renderSelectMenu({ label: 'Fruit' })
        expect(screen.getByText('Fruit')).toBeInTheDocument()
    })

    it('does not show options initially', () => {
        renderSelectMenu()
        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
        expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    })

    it('shows options when trigger clicked', async () => {
        renderSelectMenu()

        await userEvent.click(screen.getByText('apple'))

        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()
        expect(screen.getByText('Cherry')).toBeInTheDocument()
    })

    it('calls onChange with correct value when option clicked', async () => {
        const handleChange = jest.fn()
        renderSelectMenu({ onChange: handleChange })

        await userEvent.click(screen.getByText('apple'))
        await userEvent.click(screen.getByText('Banana'))

        expect(handleChange).toHaveBeenCalledWith('banana')
    })

    it('closes after option selected', async () => {
        renderSelectMenu({ onChange: jest.fn() })

        await userEvent.click(screen.getByText('apple'))
        await userEvent.click(screen.getByText('Banana'))

        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    })

    it('closes when clicking outside', async () => {
        renderSelectMenu()

        await userEvent.click(screen.getByText('apple'))
        expect(screen.getByText('Apple')).toBeInTheDocument()

        fireEvent.mouseDown(document.body)

        expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    })

    it('displays selectedValue in trigger', () => {
        renderSelectMenu({ selectedValue: 'cherry' })
        expect(screen.getByText('cherry')).toBeInTheDocument()
    })

})