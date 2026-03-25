import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from './Link';

describe('Link', () => {

    it('renders without crashing', () => {
        render(<Link href="https://example.com">Click me</Link>);
        expect(screen.getByRole('link')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
        render(<Link href="https://example.com">Hello World</Link>);
        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })

    it('has correct href', () => {
        render(<Link href="https://example.com">Click me</Link>);
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
    })

    it('calls onClick when clicked', async () => {
        const handleClick = jest.fn()
        render(<Link href="https://example.com" onClick={handleClick}>Click me</Link>);

        await userEvent.click(screen.getByRole('link'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const handleClick = jest.fn()
        render(<Link href="https://example.com" onClick={handleClick} disabled>Click me</Link>)

        await userEvent.click(screen.getByText('Click me'))

        expect(handleClick).not.toHaveBeenCalled()
    })
})