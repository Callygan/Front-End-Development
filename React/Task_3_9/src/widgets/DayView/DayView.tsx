import { useCalendarStore } from '../../entities/store/useCalendarStore'

const HOURS = Array.from({ length: 24 }, (_, i) => i) // 0..23

const formatHour = (hour: number) => {
  if (hour === 0) return '12 am'
  if (hour < 12) return `${hour} am`
  if (hour === 12) return '12 pm'
  return `${hour - 12} pm`
}

const getCurrentTimePosition = () => {
  const now = new Date()
  const minutes = now.getHours() * 60 + now.getMinutes()
  return (minutes / (24 * 60)) * 100
}

export const DayView = () => {
  const { currentDate, events, calendars } = useCalendarStore()

  const dateStr = currentDate.toISOString().split('T')[0]

  const visibleCalendarIds = calendars
    .filter((c) => c.isVisible)
    .map((c) => c.id)

  const dayEvents = events.filter(
    (e) => e.date === dateStr && visibleCalendarIds.includes(e.calendarId)
  )

  const getEventStyle = (startTime: string, endTime: string) => {
    const [startH, startM] = startTime.split(':').map(Number)
    const [endH, endM] = endTime.split(':').map(Number)

    const startMinutes = startH * 60 + startM
    const endMinutes = endH * 60 + endM
    const duration = endMinutes - startMinutes

    const top = (startMinutes / (24 * 60)) * 100
    const height = (duration / (24 * 60)) * 100

    return { top: `${top}%`, height: `${height}%` }
  }

  const getCalendarColor = (calendarId: string) => {
    return calendars.find((c) => c.id === calendarId)?.color ?? '#A8DAB5'
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {/* Day header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="w-16" />
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 uppercase">
            {currentDate.toLocaleDateString('en-US', { weekday: 'short' })}
          </span>
          <span className={`text-2xl font-medium w-10 h-10 flex items-center justify-center rounded-full
            ${currentDate.toDateString() === new Date().toDateString()
              ? 'bg-green-500 text-white'
              : 'text-gray-700'
            }`}
          >
            {currentDate.getDate()}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-1 relative">
        {/* Hours column */}
        <div className="w-16 shrink-0">
          {HOURS.map((hour) => (
            <div key={hour} className="h-14 flex items-start justify-end pr-2 pt-1">
              <span className="text-xs text-gray-400">
                {hour === 0 ? '' : formatHour(hour)}
              </span>
            </div>
          ))}
        </div>

        {/* Events column */}
        <div className="flex-1 relative border-l border-gray-200">
          {/* Hour lines */}
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="h-14 border-b border-gray-100"
            />
          ))}

          {/* Current time line */}
          <div
            className="absolute left-0 right-0 z-10 pointer-events-none"
            style={{ top: `${getCurrentTimePosition()}%` }}
          >
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 -ml-1" />
              <div className="flex-1 h-px bg-red-500" />
            </div>
          </div>

          {/* Events */}
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="absolute left-1 right-1 rounded px-2 py-1 cursor-pointer overflow-hidden"
              style={{
                ...getEventStyle(event.startTime, event.endTime),
                backgroundColor: getCalendarColor(event.calendarId) + '99',
                borderLeft: `3px solid ${getCalendarColor(event.calendarId)}`,
              }}
            >
              <p className="text-xs font-medium text-gray-800 truncate">{event.title}</p>
              <p className="text-xs text-gray-600">{event.startTime} - {event.endTime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}