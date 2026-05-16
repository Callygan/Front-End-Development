import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextArea } from './TextArea'
import type { TextAreaProps } from './TextArea.types'

const renderTextArea = (props: Partial<TextAreaProps> = {}) =>
    render(<TextArea {...props} />)

describe('TextArea', () => {

    it('renders without crashing', () => {
        renderTextArea()
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders label when provided', () => {
        renderTextArea({ label: 'Description' })
        expect(screen.getByText('Description')).toBeInTheDocument()
    })

    it('does not render label when not provided', () => {
        renderTextArea()
        expect(screen.queryByText('Description')).not.toBeInTheDocument()
    })

    it('renders placeholder', () => {
        renderTextArea({ placeholder: 'Enter text...' })
        expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
    })

    it('calls onChange when typing', async () => {
        const handleChange = jest.fn()
        renderTextArea({ value: '', onChange: handleChange })

        await userEvent.type(screen.getByRole('textbox'), 'hello')

        expect(handleChange).toHaveBeenCalled()
    })

    it('has correct rows attribute', () => {
        renderTextArea({ rows: 6 })
        expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6')
    })

    it('has default rows of 4', () => {
        renderTextArea()
        expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4')
    })
})