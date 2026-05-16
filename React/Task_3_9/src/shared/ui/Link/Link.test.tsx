import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link } from './Link'
import type { LinkProps } from './Link.types'

const renderLink = (props: Partial<LinkProps> = {}) => {
    const { children = 'Click me', ...rest } = props
    return render(<Link href="https://example.com" {...rest as Omit<LinkProps, 'children'>}>{children}</Link>)
}

describe('Link', () => {

    it('renders without crashing', () => {
        renderLink()
        expect(screen.getByRole('link')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
        renderLink({ children: 'Hello World' })
        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('has correct href', () => {
        renderLink()
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
    })

    it('calls onClick when clicked', async () => {
        const handleClick = jest.fn()
        renderLink({ onClick: handleClick })

        await userEvent.click(screen.getByRole('link'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const handleClick = jest.fn()
        renderLink({ onClick: handleClick, disabled: true })

        await userEvent.click(screen.getByText('Click me'))

        expect(handleClick).not.toHaveBeenCalled()
    })
})