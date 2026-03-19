import { useState } from 'react'
import type { DropdownProps } from './Dropdown.types'
import arrowIcon from '../../assets/icons/arrow-down-icon.png'

export const Dropdown = ({ label, options, selectedValue, onChange }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="w-24 relative">
            {label && (
                <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
            )}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="px-2 py-2 border border-gray-300 rounded cursor-pointer flex justify-between items-center text-sm text-gray-700 hover:bg-gray-50"
            >
                <span>{selectedValue}</span>
                <img 
                    src={arrowIcon} 
                    alt="Arrow Icon"
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 w-full border border-gray-300 rounded-lg mt-1 bg-white shadow-md z-10">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onChange && onChange(option.value)
                                setIsOpen(false)
                            }}
                            className={`
                                px-4 py-2 text-sm cursor-pointer
                                ${selectedValue ===option.value
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