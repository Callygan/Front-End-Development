import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'
import type { InputProps } from './Input.types'

const renderInput = (props: Partial<InputProps> = {}) =>
    render(<Input {...props} />)

describe('Input', () => {

    it('renders without crashing', () => {
        renderInput()
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        renderInput({ label: 'Username' })
        expect(screen.getByText('Username')).toBeInTheDocument()
    })

    it('does not render label when not provided', () => {
        renderInput()
        // <label> element has no ARIA role — check via querySelector
        expect(document.querySelector('label')).not.toBeInTheDocument()
    })

    it('renders placeholder', () => {
        renderInput({ placeholder: 'Enter your name' })
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    })

    it('calls onChange when typing', async () => {
        const handleChange = jest.fn()
        renderInput({ value: '', onChange: handleChange })

        await userEvent.type(screen.getByRole('textbox'), 'hello')

        expect(handleChange).toHaveBeenCalled()
    })

    it('renders error message when error prop provided', () => {
        renderInput({ error: 'This field is required' })
        expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('does not render error message when no error', () => {
        renderInput()
        expect(screen.queryByText('This field is required')).not.toBeInTheDocument()
    })

    it('is disabled when disabled prop passed', () => {
        renderInput({ disabled: true })
        expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('password type: input starts as type password', () => {
        renderInput({ type: 'password' })
        expect(document.querySelector('input[type="password"]')).toBeInTheDocument()
    })

    it('password type: toggle shows password', async () => {
        renderInput({ type: 'password' })

        expect(document.querySelector('input[type="password"]')).toBeInTheDocument()

        await userEvent.click(screen.getByAltText('toggle password'))

        expect(document.querySelector('input[type="text"]')).toBeInTheDocument()
        expect(document.querySelector('input[type="password"]')).not.toBeInTheDocument()
    })

    it('password type: toggle hides password again', async () => {
        renderInput({ type: 'password' })

        await userEvent.click(screen.getByAltText('toggle password'))
        await userEvent.click(screen.getByAltText('toggle password'))

        expect(document.querySelector('input[type="password"]')).toBeInTheDocument()
    })
})