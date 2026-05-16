import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'
import type { ModalProps } from './Modal.types'

const renderModal = ({ children, isOpen = true, onClose = jest.fn(), ...rest }: Partial<ModalProps> = {}) =>
    render(
        <Modal isOpen={isOpen} onClose={onClose} {...rest}>
            {children ?? <p>Content</p>}
        </Modal>
    )

describe('Modal', () => {

    it('does not render when isOpen=false', () => {
        renderModal({ isOpen: false, title: 'Test Modal' })
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('renders when isOpen=true', () => {
        renderModal({ title: 'Test Modal' })
        expect(screen.getByText('Test Modal')).toBeInTheDocument()
        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('renders title when provided', () => {
        renderModal({ title: 'My Title' })
        expect(screen.getByText('My Title')).toBeInTheDocument()
    })

    it('does not render title when not provided', () => {
        renderModal()
        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    })

    it('calls onClose when X button clicked', async () => {
        const handleClose = jest.fn()
        renderModal({ onClose: handleClose, title: 'Test' })

        await userEvent.click(screen.getByAltText('Close Icon'))

        expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when clicking outside modal', () => {
        const handleClose = jest.fn()
        renderModal({ onClose: handleClose, title: 'Test' })

        fireEvent.mouseDown(document.body)

        expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onClose when clicking inside modal', () => {
        const handleClose = jest.fn()
        renderModal({ onClose: handleClose, title: 'Test' })

        fireEvent.mouseDown(screen.getByText('Test'))

        expect(handleClose).not.toHaveBeenCalled()
    })

})