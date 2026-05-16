import { render, screen } from '@testing-library/react'
import { Icon } from './Icons'
import type { IconProps } from './Icons.type'

const renderIcon = ({ name = 'close', ...rest }: Partial<IconProps> = {}) =>
    render(<Icon name={name} {...rest as Omit<IconProps, 'name'>} />)

describe('Icon', () => {

    it('renders without crashing', () => {
        renderIcon()
        expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('uses name as alt text when alt not provided', () => {
        renderIcon()
        expect(screen.getByAltText('close')).toBeInTheDocument()
    })

    it('uses custom alt text when provided', () => {
        renderIcon({ alt: 'Close button' })
        expect(screen.getByAltText('Close button')).toBeInTheDocument()
    })

    it('applies default size of 24', () => {
        renderIcon()
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('width', '24')
        expect(img).toHaveAttribute('height', '24')
    })

    it('applies custom size', () => {
        renderIcon({ size: 32 })
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('width', '32')
        expect(img).toHaveAttribute('height', '32')
    })

    it('renders different icons by name', () => {
        const { rerender } = renderIcon()
        expect(screen.getByAltText('close')).toBeInTheDocument()

        rerender(<Icon name="edit" />)
        expect(screen.getByAltText('edit')).toBeInTheDocument()
    })

    it('renders all icon names without crashing', () => {
        const iconNames = [
            'arrowDown', 'arrowLeft', 'arrowRight', 'checked',
            'close', 'delete', 'edit', 'eyeLine', 'eyeClose',
            'google', 'playBlack', 'playWhite', 'checkboxFill',
            'checkboxLine', 'colorSelected', 'color'
        ] as const

        iconNames.forEach(name => {
            const { unmount } = renderIcon({ name })
            expect(screen.getByRole('img')).toBeInTheDocument()
            unmount()
        })
    })
})