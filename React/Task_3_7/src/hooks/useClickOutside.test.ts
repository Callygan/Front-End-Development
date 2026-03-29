import { renderHook } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { useClickOutside } from './useClickOutside'

describe('useClickOutside', () => {

    it('returns a ref object', () => {
        const callback = jest.fn()
        const { result } = renderHook(() => useClickOutside(callback))

        expect(result.current).toBeDefined()
        expect(result.current).toHaveProperty('current')
    })

    it('calls callback when clicking outside the ref element', () => {
        const callback = jest.fn()
        const { result } = renderHook(() => useClickOutside(callback))

        // create an element and attach it to the DOM
        const div = document.createElement('div')
        document.body.appendChild(div)

        // attach the ref to the element
        Object.defineProperty(result.current, 'current', {
            value: div,
            writable: true,
        })

        // click outside the ref element
        fireEvent.mouseDown(document.body)

        expect(callback).toHaveBeenCalledTimes(1)

        document.body.removeChild(div)
    })

    it('does not call callback when clicking inside the ref element', () => {
        const callback = jest.fn()
        const { result } = renderHook(() => useClickOutside(callback))

        const div = document.createElement('div')
        document.body.appendChild(div)
        Object.defineProperty(result.current, 'current', {
            value: div,
            writable: true,
        })

        fireEvent.mouseDown(div)

        expect(callback).not.toHaveBeenCalled()

        document.body.removeChild(div)
    })

    it('removes event listener on unmount', () => {
        const callback = jest.fn()
        const removeSpy = jest.spyOn(document, 'removeEventListener')

        const { unmount } = renderHook(() => useClickOutside(callback))
        unmount()

        expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))

        removeSpy.mockRestore()
    })

    it('adds event listener on mount', () => {
        const callback = jest.fn()
        const addSpy = jest.spyOn(document, 'addEventListener')

        renderHook(() => useClickOutside(callback))

        expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))

        addSpy.mockRestore()
    })

})