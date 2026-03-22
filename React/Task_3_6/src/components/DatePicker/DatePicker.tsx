import { useState } from 'react'
import type { DatePickerProps } from './DatePicker.types'
import arrowLeftIcon from '../../assets/icons/arrow-left-icon.png'
import arrowRightIcon from '../../assets/icons/arrow-right-icon.png'

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
    const [currentDate, setCurrentDate] = useState(new Date())

    const month = currentDate.toLocaleString('en-US', { month: 'long' })
    const year = currentDate.getFullYear()

    const goToPrevMonth = () => {
        const newDate = new Date(currentDate)
        newDate.setMonth(currentDate.getMonth() - 1)
        setCurrentDate(newDate)
    }

    const goToNextMonth = () => {
        const newDate = new Date(currentDate)
        newDate.setMonth(currentDate.getMonth() + 1)
        setCurrentDate(newDate)
    }

    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay()

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    return (
        <div className="w-64 border border-gray-300 rounded-lg p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">{month} {year}</span>
                <div>
                    <button onClick={goToPrevMonth} className="cursor-pointer hover:shadow-md rounded-full p-1">
                        <img src={arrowLeftIcon} alt="Previous Month" />
                    </button>
                    <button onClick={goToNextMonth} className="cursor-pointer hover:shadow-md rounded-full p-1">
                        <img src={arrowRightIcon} alt="Next Month" />
                    </button>
                </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-xs font-medium text-gray-500">{day}</div>
                ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty spaces at the beginning */}
                {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                
                {/* Days of the month */}
                {days.map((day) => {
                    const isSelected = value?.getDate() === day &&
                        value?.getMonth() === currentDate.getMonth() &&
                        value?.getFullYear() === year

                    return (
                        <div
                            key={day}
                            onClick={() => {
                                const selected = new Date(year, currentDate.getMonth(), day)
                                onChange && onChange(selected)
                            }}
                            className={`
                                text-center text-sm py-1 rounded-full cursor-pointer
                                ${isSelected
                                    ? 'bg-green-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            {day}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}