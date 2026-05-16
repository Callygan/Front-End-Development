import { useState } from 'react'
import { useCalendarStore } from '../../entities/store/useCalendarStore'
import { DatePicker } from '../../shared/ui/DatePicker/DatePicker'
import { Button } from '../../shared/ui/Button/Button'
import { Icon } from '../../shared/ui/Icons/Icons'

interface SidebarProps {
  onCreateCalendar: () => void
  onEditCalendar: (id: string) => void
  onDeleteCalendar: (id: string) => void
  onCreateEvent: () => void  // ← adaugă
}

export const Sidebar = ({
  onCreateCalendar,
  onEditCalendar,
  onDeleteCalendar,
  onCreateEvent,  // ← adaugă
}: SidebarProps) => {
  const { calendars, setCurrentDate, toggleCalendarVisibility } = useCalendarStore()
  const [hoveredCalendarId, setHoveredCalendarId] = useState<string | null>(null)

  return (
    <aside className="w-72 border-r border-gray-200 flex flex-col p-4 gap-6 shrink-0">
      {/* Create Button */}
      <Button variant="primary" onClick={onCreateEvent}>
        + Create
      </Button>

      {/* Mini DatePicker */}
      <DatePicker
        onChange={(date) => setCurrentDate(date)}
      />

      {/* My Calendars */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">My calendars</span>
          <button
            onClick={onCreateCalendar}
            className="cursor-pointer hover:bg-gray-100 rounded-full p-1 text-lg font-light"
          >
            +
          </button>
        </div>

        {calendars.map((calendar) => (
          <div
            key={calendar.id}
            className="flex items-center justify-between group"
            onMouseEnter={() => setHoveredCalendarId(calendar.id)}
            onMouseLeave={() => setHoveredCalendarId(null)}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={calendar.isVisible}
                onChange={() => toggleCalendarVisibility(calendar.id)}
                className="w-4 h-4 rounded cursor-pointer"
                style={{ accentColor: calendar.color }}
              />
              <span className="text-sm text-gray-700">{calendar.name}</span>
            </div>

            {hoveredCalendarId === calendar.id && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditCalendar(calendar.id)}
                  className="cursor-pointer hover:bg-gray-100 rounded-full p-1"
                >
                  <Icon name="edit" size={14} />
                </button>
                {!calendar.isDefault && (
                  <button
                    onClick={() => onDeleteCalendar(calendar.id)}
                    className="cursor-pointer hover:bg-gray-100 rounded-full p-1"
                  >
                    <Icon name="delete" size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}