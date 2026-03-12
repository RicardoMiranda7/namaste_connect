export type Attendee = { id: string; name: string; email: string }
export type ClassLesson = {
  id: string;
  title: string;
  date: string;
  time: string;
  maxAttendees: number;
  status: "scheduled" | "cancelled" | "completed";
  attendees: Attendee[];
  description: string;
  photo: string;
}

let mockClasses: ClassLesson[] = [
  {
    id: "1",
    title: "Morning Vinyasa Flow",
    date: "2026-03-15",
    time: "08:00 AM",
    maxAttendees: 15,
    status: "scheduled",
    attendees: [{id: "a1", name: "Alice", email: "alice@test.com"}],
    description: "Awaken your body and mind with this dynamic, fluid sequence. Perfect for building heat, strength, and flexibility to start your day with intention.",
    photo: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Evening Yin & Restore",
    date: "2026-03-16",
    time: "07:00 PM",
    maxAttendees: 10,
    status: "scheduled",
    attendees: [],
    description: "A slow-paced, meditative practice focusing on deep connective tissues. Hold poses for longer durations to release tension and prepare for a restful sleep.",
    photo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Power Core Yoga",
    date: "2026-03-10",
    time: "06:00 PM",
    maxAttendees: 20,
    status: "completed",
    attendees: [{id: "a2", name: "Bob", email: "bob@test.com"}],
    description: "An energetic and challenging class designed to build core strength, stamina, and resilience. Expect to sweat and push your boundaries.",
    photo: "https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=800&q=80"
  },
];

export const api = {
  login: async () => {
    localStorage.setItem("auth", "true");
  },
  logout: async () => {
    localStorage.removeItem("auth");
  },
  isAuthenticated: () => localStorage.getItem("auth") === "true",
  getClasses: async (): Promise<ClassLesson[]> => [...mockClasses],
  getClass: async (id: string): Promise<ClassLesson | undefined> => mockClasses.find(c => c.id === id),
  cancelClass: async (id: string) => {
    mockClasses = mockClasses.map(c => c.id === id ? {...c, status: "cancelled"} : c);
  },
  addAttendee: async (classId: string, name: string, email: string) => {
    const newAttendee = {id: Math.random().toString(36).substring(7), name, email};
    mockClasses = mockClasses.map(c =>
        c.id === classId ? {...c, attendees: [...c.attendees, newAttendee]} : c
    );
  },
  removeAttendee: async (classId: string, attendeeId: string) => {
    mockClasses = mockClasses.map(c =>
        c.id === classId ? {...c, attendees: c.attendees.filter(a => a.id !== attendeeId)} : c
    );
  },
  // Add to api object in mockApi.ts
  addClass: async (lesson: Omit<ClassLesson, 'id' | 'attendees' | 'status'>) => {
    const newLesson: ClassLesson = {
      ...lesson,
      id: Math.random().toString(36).substring(2, 9),
      status: "scheduled",
      attendees: []
    };
    mockClasses.push(newLesson);
  },
};