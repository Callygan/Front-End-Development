import type { ColorPickerProps } from './ColorPicker.types'

export const ColorPicker = ({ label, colors, selectedColor, onChange }: ColorPickerProps) => {
    return (
        <div className="flex gap-8">
            {/* Grila stânga - selectare */}
            <div className="flex flex-col gap-2">
                {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
                <div className="flex flex-wrap gap-2 w-40">
                    {colors.map((color) => (
                        <div
                            key={color}
                            onClick={() => onChange && onChange(color)}
                            style={{ backgroundColor: color }}
                            className={`
                                w-6 h-6 rounded-full cursor-pointer transition-all
                                ${selectedColor === color
                                    ? 'ring-2 ring-offset-1 ring-gray-500'
                                    : 'hover:ring-2 hover:ring-offset-1 hover:ring-gray-300'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>

            {/* Grila dreapta - culoarea selectata */}
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-700">Colour picked</p>
                <div className="flex flex-wrap gap-2 w-40">
                    {colors.map((color) => (
                        <div
                            key={color}
                            style={{ backgroundColor: color }}
                            className={`
                                w-6 h-6 rounded-full transition-all
                                ${selectedColor === color
                                    ? 'ring-2 ring-offset-1 ring-gray-500 opacity-100'
                                    : 'opacity-30'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}