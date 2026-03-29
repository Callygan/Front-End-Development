import '@testing-library/jest-dom'

const originalConsoleError = console.error

beforeAll(() => {
    console.error = (...args: unknown[]) => {
        const message = args[0] instanceof Error ? args[0].message : String(args[0])
        if (message.includes('Not implemented: navigation')) {
            return
        }
        originalConsoleError(...args)
    }
})

afterAll(() => {
    console.error = originalConsoleError
})