import { useState } from "react"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"

interface Event {
  id: string
  title: string
  date: string
  type?: string
}

interface EventCalendarProps {
  events: Event[]
  onSelectDate?: (date: string) => void
  onSelectEvent?: (event: Event) => void
}

export function EventCalendar({ events, onSelectDate, onSelectEvent }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDayOfWeek = firstDay.getDay()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date.startsWith(dateStr))
  }

  const days = []
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDay(day)
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

    days.push(
      <div 
        key={day}
        onClick={() => onSelectDate?.(dateStr)}
        className={`h-24 border border-gray-200 p-1 ${onSelectDate ? 'cursor-pointer hover:bg-gray-50' : ''} ${isToday ? 'bg-blue-50' : ''}`}
      >
        <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
          {day}
        </span>
        <div className="mt-1 space-y-1">
          {dayEvents.slice(0, 2).map((event) => (
            <button
              key={event.id}
              onClick={(e) => { e.stopPropagation(); onSelectEvent?.(event) }}
              className="w-full text-left text-xs p-1 bg-blue-100 text-blue-700 rounded truncate hover:bg-blue-200"
            >
              {event.title}
            </button>
          ))}
          {dayEvents.length > 2 && (
            <span className="text-xs text-gray-500">+{dayEvents.length - 2} more</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-2 text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days}
      </div>
    </div>
  )
}
