import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import type { ButtonProps } from './Button.types'

const renderButton = (props: Partial<ButtonProps> = {}) => {
    const { children = 'Click me', ...rest } = props
    return render(<Button {...rest as Omit<ButtonProps, 'children'>}>{children}</Button>)
}

describe('Button', () => {

    it('renders without crashing', () => {
        renderButton()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
        renderButton({ children: 'Hello World' })
        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        const handleClick = jest.fn()
        renderButton({ onClick: handleClick })

        await userEvent.click(screen.getByRole('button'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const handleClick = jest.fn()
        renderButton({ onClick: handleClick, disabled: true })

        await userEvent.click(screen.getByRole('button'))

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('is disabled when disabled prop is passed', () => {
        renderButton({ disabled: true })
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('renders primary variant by default', () => {
        renderButton()
        expect(screen.getByRole('button')).toHaveClass('bg-green-500')
    })

    it('renders secondary variant', () => {
        renderButton({ variant: 'secondary' })
        expect(screen.getByRole('button')).toHaveClass('bg-white')
    })

    it('renders icon when icon prop is true', () => {
        renderButton({ icon: true })
        expect(screen.getByAltText('icon')).toBeInTheDocument()
    })

    it('does not render icon when icon prop is false', () => {
        renderButton()
        expect(screen.queryByAltText('icon')).not.toBeInTheDocument()
    })
})