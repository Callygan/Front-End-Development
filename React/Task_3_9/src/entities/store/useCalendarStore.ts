import { create } from 'zustand'
import type { Calendar, CalendarEvent } from '../../shared/types'
import { DEFAULT_CALENDAR_COLOR } from '../../shared/constants/colors'

interface CalendarStore {
  calendars: Calendar[]
  events: CalendarEvent[]
  currentDate: Date

  // Calendar actions
  addCalendar: (calendar: Omit<Calendar, 'id'>) => void
  updateCalendar: (id: string, data: Partial<Calendar>) => void
  deleteCalendar: (id: string) => void
  toggleCalendarVisibility: (id: string) => void

  // Event actions
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  updateEvent: (id: string, data: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void

  // Date actions
  setCurrentDate: (date: Date) => void
  goToPrevDay: () => void
  goToNextDay: () => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useCalendarStore = create<CalendarStore>((set) => ({
  currentDate: new Date(),

  calendars: [
    {
      id: 'default',
      name: 'Calendar 1',
      color: DEFAULT_CALENDAR_COLOR,
      isDefault: true,
      isVisible: true,
    },
  ],

  events: [],

  // Calendar actions
  addCalendar: (calendar) =>
    set((state) => ({
      calendars: [...state.calendars, { ...calendar, id: generateId() }],
    })),

  updateCalendar: (id, data) =>
    set((state) => ({
      calendars: state.calendars.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    })),

  deleteCalendar: (id) =>
    set((state) => ({
      calendars: state.calendars.filter((c) => c.id !== id),
      events: state.events.filter((e) => e.calendarId !== id),
    })),

  toggleCalendarVisibility: (id) =>
    set((state) => ({
      calendars: state.calendars.map((c) =>
        c.id === id ? { ...c, isVisible: !c.isVisible } : c
      ),
    })),

  // Event actions
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: generateId() }],
    })),

  updateEvent: (id, data) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  // Date actions
  setCurrentDate: (date) => set({ currentDate: date }),

  goToPrevDay: () =>
    set((state) => {
      const prev = new Date(state.currentDate)
      prev.setDate(prev.getDate() - 1)
      return { currentDate: prev }
    }),

  goToNextDay: () =>
    set((state) => {
      const next = new Date(state.currentDate)
      next.setDate(next.getDate() + 1)
      return { currentDate: next }
    }),
}))