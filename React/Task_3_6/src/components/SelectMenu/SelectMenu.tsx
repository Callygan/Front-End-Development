import { useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import type { SelectMenuProps } from './SelectMenu.types'

export const SelectMenu = ({ label, options, selectedValue, onChange }: SelectMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useClickOutside(() => setIsOpen(false))

    return (
        <div ref={ref} className="w-24 relative">
            {label && (
                <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
            )}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="px-2 py-2 border-b border-gray-700 cursor-pointer flex justify-between items-center text-sm text-gray-700 hover:bg-gray-50"
            >
                <span>{selectedValue}</span>
            </div>

            {isOpen && (
                <div className="absolute top-15 left-0 w-full border border-gray-300 rounded-lg mt-1 bg-white shadow-md z-10">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onChange && onChange(option.value)
                                setIsOpen(false)
                            }}
                            className={`
                                px-4 py-2 text-sm cursor-pointer
                                ${selectedValue === option.value
                                    ? 'bg-gray-300 text-gray-900'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}