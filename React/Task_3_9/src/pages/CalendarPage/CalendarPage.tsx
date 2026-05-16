import { useState } from 'react'
import { Sidebar } from '../../widgets/Sidebar/Sidebar'
import { Header } from '../../widgets/Header/Header'
import { DayView } from '../../widgets/DayView/DayView'
import { CreateEventModal } from '../../features/event/CreateEventModal'

export const CalendarPage = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showCreateCalendar, setShowCreateCalendar] = useState(false)
  const [editCalendarId, setEditCalendarId] = useState<string | null>(null)
  const [deleteCalendarId, setDeleteCalendarId] = useState<string | null>(null)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onCreateCalendar={() => setShowCreateCalendar(true)}
          onEditCalendar={(id) => setEditCalendarId(id)}
          onDeleteCalendar={(id) => setDeleteCalendarId(id)}
          onCreateEvent={() => setShowCreateEvent(true)}
        />

        <main className="flex-1 overflow-auto">
          <DayView />
        </main>
      </div>

      <CreateEventModal
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
      />
    </div>
  )
}