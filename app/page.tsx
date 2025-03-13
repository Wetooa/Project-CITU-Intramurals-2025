import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScheduleView } from "@/components/schedule-view"
import { UpcomingAppointments } from "@/components/upcoming-appointments"

export default function SchedulePage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Manage your appointments and events</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="calendar">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar" className="pt-4">
                  <ScheduleView />
                </TabsContent>
                <TabsContent value="list" className="pt-4">
                  <UpcomingAppointments />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

