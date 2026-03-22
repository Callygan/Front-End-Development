import type { ModalProps } from './Modal.types'
import closeIcon from '../../assets/icons/close.png'

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-96 shadow-lg">
                <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-300">
                    {title && <h2 className="text-xl font-semibold">{title}</h2>}
                    <button className="cursor-pointer" onClick={onClose}>
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>  
    )
}