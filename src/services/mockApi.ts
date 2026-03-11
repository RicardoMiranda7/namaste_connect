export type Attendee = { id: string; name: string; email: string }
export type ClassSession = {
  id: string;
  title: string;
  date: string;
  time: string;
  maxAttendees: number;
  status: "scheduled" | "cancelled" | "completed";
  attendees: Attendee[];
}

let mockClasses: ClassSession[] =[
  { id: "1", title: "Morning Vinyasa", date: "2026-03-10", time: "08:00 AM", maxAttendees: 15, status: "scheduled", attendees:[{ id: "a1", name: "Alice", email: "alice@test.com" }] },
  { id: "2", title: "Evening Yin", date: "2026-03-11", time: "07:00 PM", maxAttendees: 10, status: "scheduled", attendees:[] },
  { id: "3", title: "Power Yoga", date: "2026-03-08", time: "06:00 PM", maxAttendees: 20, status: "completed", attendees:[{ id: "a2", name: "Bob", email: "bob@test.com" }] },
];

export const api = {
  login: async () => { localStorage.setItem("auth", "true"); },
  logout: async () => { localStorage.removeItem("auth"); },
  isAuthenticated: () => localStorage.getItem("auth") === "true",

  getClasses: async (): Promise<ClassSession[]> => [...mockClasses],

  getClass: async (id: string): Promise<ClassSession | undefined> =>
      mockClasses.find(c => c.id === id),

  cancelClass: async (id: string) => {
    mockClasses = mockClasses.map(c => c.id === id ? { ...c, status: "cancelled" } : c);
  },

  addAttendee: async (classId: string, name: string, email: string) => {
    const newAttendee = { id: Math.random().toString(36).substring(7), name, email };
    mockClasses = mockClasses.map(c =>
        c.id === classId ? { ...c, attendees: [...c.attendees, newAttendee] } : c
    );
  },

  removeAttendee: async (classId: string, attendeeId: string) => {
    mockClasses = mockClasses.map(c =>
        c.id === classId ? { ...c, attendees: c.attendees.filter(a => a.id !== attendeeId) } : c
    );
  }
};