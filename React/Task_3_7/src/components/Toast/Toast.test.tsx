import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from './Toast'
import type { ToastProps } from './Toast.types'

const renderToast = (props: Partial<ToastProps> = {}) =>
    render(<Toast message="Hello" onClose={jest.fn()} {...props} />)

describe('Toast', () => {

    it('renders without crashing', () => {
        renderToast({ message: 'Hello World' })
        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('renders message correctly', () => {
        renderToast({ message: 'File saved successfully' })
        expect(screen.getByText('File saved successfully')).toBeInTheDocument()
    })

    it('renders close button', () => {
        renderToast()
        expect(screen.getByAltText('Close Icon')).toBeInTheDocument()
    })

    it('calls onClose when X button clicked', async () => {
        const handleClose = jest.fn()
        renderToast({ onClose: handleClose })

        await userEvent.click(screen.getByAltText('Close Icon'))

        expect(handleClose).toHaveBeenCalledTimes(1)
    })

})