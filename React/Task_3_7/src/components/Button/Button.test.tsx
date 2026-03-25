import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {

    it('renders without crashing', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument(); 
    })

    it('renders children correctly', () => {
        render(<Button>Hello World</Button>)
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    })

    it('calls onClick when clicked', async () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)

        await userEvent.click(screen.getByRole('button'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick} disabled>Click me</Button>)

        await userEvent.click(screen.getByRole('button'))

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('is disabled when disabled prop is passed', () => {
        render(<Button disabled>Click me</Button>)
        expect(screen.getByRole('button')).toBeDisabled();
    })
})