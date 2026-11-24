export type Attendee = { id: string; name: string; email?: string }
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

const CLASS_STORAGE_KEY = "namaste_connect_classes";

const initialClasses: ClassLesson[] = [
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

const readStoredClasses = (): ClassLesson[] => {
  if (typeof window === "undefined") return [...initialClasses];

  const stored = window.localStorage.getItem(CLASS_STORAGE_KEY);
  if (!stored) return [...initialClasses];

  try {
    const parsed = JSON.parse(stored) as ClassLesson[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...initialClasses];
  } catch {
    return [...initialClasses];
  }
};

let mockClasses: ClassLesson[] = readStoredClasses();

const persistClasses = () => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CLASS_STORAGE_KEY, JSON.stringify(mockClasses));
};

const toDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(new Error("Failed to read image file"));
  reader.readAsDataURL(file);
});

const ensureAdmin = () => {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem("auth") !== "true") {
    throw new Error("Admin authentication required");
  }
};

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
    ensureAdmin();
    mockClasses = mockClasses.map(c => c.id === id ? {...c, status: "cancelled"} : c);
    persistClasses();
  },
  updateClass: async (id: string, updates: Partial<Omit<ClassLesson, 'id' | 'attendees' | 'status'>>) => {
    ensureAdmin();
    mockClasses = mockClasses.map(c => c.id === id ? {...c, ...updates} : c);
    persistClasses();
  },
  addAttendee: async (classId: string, name: string, email: string) => {
    ensureAdmin();
    const newAttendee = {id: Math.random().toString(36).substring(7), name, email};
    mockClasses = mockClasses.map(c =>
        c.id === classId ? {...c, attendees: [...c.attendees, newAttendee]} : c
    );
    persistClasses();
  },
  enrollAttendee: async (classId: string, name: string) => {
    ensureAdmin();
    const newAttendee = {id: Math.random().toString(36).substring(7), name};
    mockClasses = mockClasses.map(c =>
        c.id === classId ? {...c, attendees: [...c.attendees, newAttendee]} : c
    );
    persistClasses();
  },
  removeAttendee: async (classId: string, attendeeId: string) => {
    ensureAdmin();
    mockClasses = mockClasses.map(c =>
        c.id === classId ? {...c, attendees: c.attendees.filter(a => a.id !== attendeeId)} : c
    );
    persistClasses();
  },
  // Add to api object in mockApi.ts
  addClass: async (lesson: Omit<ClassLesson, 'id' | 'attendees' | 'status'>) => {
    ensureAdmin();
    const newLesson: ClassLesson = {
      ...lesson,
      id: Math.random().toString(36).substring(2, 9),
      status: "scheduled",
      attendees: []
    };
    mockClasses.push(newLesson);
    persistClasses();
  },
  createImageUrl: async (file: File) => toDataUrl(file),
};