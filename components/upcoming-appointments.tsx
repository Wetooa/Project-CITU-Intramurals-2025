"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CalendarClock, Search } from "lucide-react"

// Mock data for demonstration
const mockAppointments = [
  {
    id: 1,
    title: "Team Meeting",
    time: "9:00 AM - 10:00 AM",
    date: "Today",
    type: "meeting",
    participants: ["Alex", "Jamie", "Taylor"],
  },
  {
    id: 2,
    title: "Dentist Appointment",
    time: "11:30 AM - 12:30 PM",
    date: "Today",
    type: "personal",
  },
  {
    id: 3,
    title: "Project Review",
    time: "2:00 PM - 3:00 PM",
    date: "Today",
    type: "meeting",
    participants: ["Morgan", "Casey"],
  },
  {
    id: 4,
    title: "Coffee with Alex",
    time: "4:00 PM - 4:30 PM",
    date: "Today",
    type: "personal",
  },
  {
    id: 5,
    title: "Client Presentation",
    time: "10:00 AM - 11:00 AM",
    date: "Tomorrow",
    type: "meeting",
    participants: ["Client", "Manager", "Team"],
  },
  {
    id: 6,
    title: "Gym Session",
    time: "6:00 PM - 7:00 PM",
    date: "Tomorrow",
    type: "personal",
  },
]

export function UpcomingAppointments() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAppointments = mockAppointments.filter((appointment) =>
    appointment.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    const date = appointment.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(appointment)
    return groups
  }, {})

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search appointments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {Object.keys(groupedAppointments).length > 0 ? (
          Object.entries(groupedAppointments).map(([date, appointments]) => (
            <div key={date} className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">{date}</h3>
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{appointment.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <CalendarClock className="mr-1 h-3 w-3" />
                          {appointment.time}
                        </div>
                        {appointment.participants && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            With: {appointment.participants.join(", ")}
                          </div>
                        )}
                      </div>
                      <Badge variant={appointment.type === "meeting" ? "default" : "secondary"}>
                        {appointment.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">No appointments found</div>
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
    </div>
  )
}

