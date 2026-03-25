export type IconName = 
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'checked'
    | 'close'
    | 'delete'
    | 'edit'
    | 'eyeLine'
    | 'eyeClose'
    | 'google'
    | 'playBlack'
    | 'playWhite'
    | 'checkboxFill'
    | 'checkboxLine'
    | 'colorSelected'
    | 'color'

export interface IconProps {
    name: IconName
    size?: number
    alt?: string
}