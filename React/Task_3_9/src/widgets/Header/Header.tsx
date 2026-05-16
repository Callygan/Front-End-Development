import { useCalendarStore } from '../../entities/store/useCalendarStore'
import { Button } from '../../shared/ui/Button/Button'

export const Header = () => {
  const { currentDate, goToPrevDay, goToNextDay, setCurrentDate } = useCalendarStore()

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 shrink-0">
      {/* Left - Logo + Navigation */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" fill="#34A853" />
            <rect x="18" y="2" width="12" height="12" rx="2" fill="#34A853" opacity="0.5" />
            <rect x="2" y="18" width="12" height="12" rx="2" fill="#34A853" opacity="0.5" />
            <rect x="18" y="18" width="12" height="12" rx="2" fill="#34A853" />
          </svg>
          <span className="text-base font-semibold text-gray-800">WebCalendar</span>
        </div>

        {/* Today button */}
        <Button variant="primary" onClick={() => setCurrentDate(new Date())}>
        Today
        </Button>

        {/* Arrows */}
        <div className="flex items-center">
          <button
            onClick={goToPrevDay}
            className="p-1 hover:bg-gray-100 rounded-full cursor-pointer text-gray-600 w-7 h-7 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={goToNextDay}
            className="p-1 hover:bg-gray-100 rounded-full cursor-pointer text-gray-600 w-7 h-7 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Date */}
        <span className="text-base font-medium text-gray-700">
          {formattedDate}
        </span>
      </div>

      {/* Right - User */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Username</span>
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold">
          U
        </div>
      </div>
    </header>
  )
}