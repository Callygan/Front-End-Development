import { useState } from 'react'
import { useCalendarStore } from '../../entities/store/useCalendarStore'
import { Modal } from '../../shared/ui/Modal/Modal'
import { Input } from '../../shared/ui/Input/Input'
import { Button } from '../../shared/ui/Button/Button'
import { Checkbox } from '../../shared/ui/Checkbox/Checkbox'
import { TextArea } from '../../shared/ui/TextArea/TextArea'
import { DatePicker } from '../../shared/ui/DatePicker/DatePicker'
import { SelectMenu } from '../../shared/ui/SelectMenu/SelectMenu'
import { Icon } from '../../shared/ui/Icons/Icons'
import { useClickOutside } from '../../shared/hooks/useClickOutside'

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateEventModal = ({ isOpen, onClose }: CreateEventModalProps) => {
  const { calendars, currentDate, addEvent } = useCalendarStore()
  const datePickerRef = useClickOutside(() => setShowDatePicker(false))

  const [title, setTitle] = useState('')
  const [date, setDate] = useState<Date>(currentDate)
  const [startTime, setStartTime] = useState('12:30')
  const [endTime, setEndTime] = useState('13:30')
  const [isAllDay, setIsAllDay] = useState(false)
  const [calendarId, setCalendarId] = useState(
    calendars.find((c) => c.isDefault)?.id ?? calendars[0].id
  )
  const [description, setDescription] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)

  const calendarOptions = calendars.map((c) => ({
    value: c.id,
    label: c.name,
  }))

  const selectedCalendar = calendars.find((c) => c.id === calendarId)

  const handleSave = () => {
    if (!title.trim()) return

    addEvent({
      title: title.trim(),
      date: date.toISOString().split('T')[0],
      startTime,
      endTime,
      isAllDay,
      calendarId,
      description,
    })

    setTitle('')
    setDate(currentDate)
    setStartTime('12:30')
    setEndTime('13:30')
    setIsAllDay(false)
    setCalendarId(calendars.find((c) => c.isDefault)?.id ?? calendars[0].id)
    setDescription('')
    onClose()
  }

  return (
    <Modal title="Create event" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">

        {/* Title */}
        <Input
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Date + Time row */}
        <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="mt-1 shrink-0">
                <Icon name="arrowRight" size={16} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                {/* Date + Time pe același rând */}
                <div className="flex items-center gap-3">
                {/* Date button */}
                <div className="relative">
                    <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded cursor-pointer whitespace-nowrap"
                    >
                    {date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                    })}
                    </button>
                    {showDatePicker && (
                    <div ref={datePickerRef} className="absolute top-8 left-0 z-20 shadow-lg bg-white rounded-lg">
                        <DatePicker
                        value={date}
                        onChange={(d) => {
                            setDate(d)
                            setShowDatePicker(false)
                        }}
                        />
                    </div>
                    )}
                </div>

                {/* Time */}
                {!isAllDay && (
                    <div className="flex items-center gap-2">
                    <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <span className="text-gray-400">—</span>
                    <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    </div>
                )}
                </div>

                {/* All day + Does not repeat */}
                <div className="flex items-center gap-4">
                <Checkbox
                    label="All day"
                    checked={isAllDay}
                    onChange={(e) => setIsAllDay(e.target.checked)}
                />
                <span className="text-sm text-gray-500">Does not repeat</span>
                </div>
            </div>
        </div>

        {/* Calendar */}
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <Icon name="checkboxFill" size={16} />
          </div>
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: selectedCalendar?.color }}
          />
          <SelectMenu
            options={calendarOptions}
            selectedValue={calendarId}
            onChange={(val) => setCalendarId(val)}
          />
        </div>

        {/* Description */}
        <div className="flex items-start gap-3">
          <div className="mt-1 shrink-0">
            <Icon name="arrowDown" size={16} />
          </div>
          <TextArea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>

      </div>
    </Modal>
  )
}