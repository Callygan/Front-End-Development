import type { ColorPickerProps } from './ColorPicker.types'

export const ColorPicker = ({ label, colors, selectedColor, onChange }: ColorPickerProps) => {
    return (
        <div className="flex gap-8">
            {/* Left grid - color options */}
            <div className="flex flex-col gap-2">
                {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
                <div className="flex flex-wrap max-w-[188px] w-full border border-gray-300 rounded-lg p-2">
                    {colors.map((color) => (
                        <div
                            key={color}
                            onClick={() => onChange && onChange(color)}
                            style={{ backgroundColor: color }}
                            className={`
                                w-4 h-4 m-1 rounded cursor-pointer transition-all
                                ${selectedColor === color
                                    ? 'ring-2 ring-offset-1 ring-gray-500'
                                    : 'hover:ring-2 hover:ring-offset-1 hover:ring-gray-300'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>

            {/* Right grid - selected color */}
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">Colour picked</p>
                <div className="flex flex-wrap max-w-[188px] w-full border border-gray-300 rounded-lg p-2 cursor-not-allowed">
                    {colors.map((color) => (
                        <div
                            key={color}
                            style={{ backgroundColor: color }}
                            className={`
                                w-4 h-4 m-1 rounded transition-all
                                ${selectedColor === color
                                    ? 'ring-2 ring-offset-1 ring-gray-500 opacity-100 '
                                    : 'opacity-50'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}