import type { ToastProps } from './Toast.types'
import closeIcon from '../../assets/icons/close.png'

export const Toast = ({ message, onClose }: ToastProps) => {
    return (
        <div className="fixed bottom-4 left-4 z-50">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-lg flex items-center gap-4">
                <span className="text-sm text-gray-700">{message}</span>
                <button className="cursor-pointer" onClick={onClose}>
                    <img src={closeIcon} alt="Close Icon" />
                </button>
            </div>
        </div>
    )
}