import type { IconProps } from './Icons.type'
import arrowDown from '../../assets/icons/arrow-down-icon.png'
import arrowLeft from '../../assets/icons/arrow-left-icon.png'
import arrowRight from '../../assets/icons/arrow-right-icon.png'
import checked from '../../assets/icons/checked.png'
import close from '../../assets/icons/close.png'
import deleteIcon from '../../assets/icons/delete.png'
import edit from '../../assets/icons/edit.png'
import eyeLine from '../../assets/icons/eye-line-icon.png'
import eyeClose from '../../assets/icons/eye-close-line-icon.png'
import google from '../../assets/icons/google.png'
import playBlack from '../../assets/icons/play_black.png'
import playWhite from '../../assets/icons/play_white.png'
import checkboxFill from '../../assets/icons/checkbox-fill.png'
import checkboxLine from '../../assets/icons/checkbox-line.png'
import colorSelected from '../../assets/icons/color-selected.png'
import color from '../../assets/icons/color.png'

const icons = {
    arrowDown,
    arrowLeft,
    arrowRight,
    checked,
    close,
    delete: deleteIcon,
    edit,
    eyeLine,
    eyeClose,
    google,
    playBlack,
    playWhite,
    checkboxFill,
    checkboxLine,
    colorSelected,
    color,
}

export const Icon = ({ name, size = 24, alt = '' }: IconProps) => {
    return (
        <img
            src={icons[name]}
            alt={alt || name}
            width={size}
            height={size}
            className="object-contain"
        />
    )
}