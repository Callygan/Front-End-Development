import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
    
    it('renders without crashing', () => {
        render(<Input />)
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        render(<Input label="Username" />)
        expect(screen.getByText('Username')).toBeInTheDocument()
    })

    it('does not render label when not provided', () => {
        render(<Input />)
        expect(screen.queryByRole('label')).not.toBeInTheDocument()
    })

    it('renders placeholder', () => {
        render(<Input placeholder="Enter your name" />)
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    })

    it('calls onChange when typing', async () => {
        const handleChange = jest.fn()
        render(<Input value="" onChange={handleChange} />)

        await userEvent.type(screen.getByRole('textbox'), 'hello')

        expect(handleChange).toHaveBeenCalled()
    })

    it
})