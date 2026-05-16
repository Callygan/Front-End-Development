export interface Calendar {
  id: string
  name: string
  color: string
  isDefault: boolean
  isVisible: boolean
}

export interface CalendarEvent {
  id: string
  title: string
  date: string        // "2024-11-02"
  startTime: string   // "12:30"
  endTime: string     // "13:30"
  isAllDay: boolean
  calendarId: string
  description?: string
}