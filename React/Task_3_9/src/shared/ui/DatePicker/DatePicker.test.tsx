import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './DatePicker'
import type { DatePickerProps } from './DatePicker.types'

const renderDatePicker = (props: Partial<DatePickerProps> = {}) =>
    render(<DatePicker {...props} />)

describe('DatePicker', () => {

    it('renders without crashing', () => {
        renderDatePicker()
        expect(screen.getByAltText('Previous Month')).toBeInTheDocument()
        expect(screen.getByAltText('Next Month')).toBeInTheDocument()
    })

    it('renders current month and year in header', () => {
        renderDatePicker()
        const now = new Date()
        const month = now.toLocaleString('en-US', { month: 'long' })
        const year = now.getFullYear()
        expect(screen.getByText(`${month} ${year}`)).toBeInTheDocument()
    })

    it('renders weekday labels', () => {
        renderDatePicker()
        const sDays = screen.getAllByText('S')
        expect(sDays).toHaveLength(2)
    })

    it('renders days of the month', () => {
        renderDatePicker()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('15')).toBeInTheDocument()
    })

    it('navigates to previous month', async () => {
        renderDatePicker()
        const now = new Date()
        const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const expectedMonth = prevMonth.toLocaleString('en-US', { month: 'long' })
        const expectedYear = prevMonth.getFullYear()

        await userEvent.click(screen.getByAltText('Previous Month'))

        expect(screen.getByText(`${expectedMonth} ${expectedYear}`)).toBeInTheDocument()
    })

    it('navigates to next month', async () => {
        renderDatePicker()
        const now = new Date()
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        const expectedMonth = nextMonth.toLocaleString('en-US', { month: 'long' })
        const expectedYear = nextMonth.getFullYear()

        await userEvent.click(screen.getByAltText('Next Month'))

        expect(screen.getByText(`${expectedMonth} ${expectedYear}`)).toBeInTheDocument()
    })

    it('calls onChange when day clicked', async () => {
        const handleChange = jest.fn()
        renderDatePicker({ onChange: handleChange })

        await userEvent.click(screen.getByText('15'))

        expect(handleChange).toHaveBeenCalledTimes(1)
        expect(handleChange).toHaveBeenCalledWith(expect.any(Date))
    })

    it('calls onChange with correct date', async () => {
        const handleChange = jest.fn()
        const now = new Date()
        renderDatePicker({ onChange: handleChange })

        await userEvent.click(screen.getByText('15'))

        const calledWith: Date = handleChange.mock.calls[0][0]
        expect(calledWith.getDate()).toBe(15)
        expect(calledWith.getMonth()).toBe(now.getMonth())
        expect(calledWith.getFullYear()).toBe(now.getFullYear())
    })

    it('does not crash when onChange not provided', async () => {
        renderDatePicker()
        await userEvent.click(screen.getByText('15'))
    })
})