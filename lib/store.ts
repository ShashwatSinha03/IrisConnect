import { monthKey, todayISO } from "@/lib/utils";

export type Role = "admin" | "teacher" | "student";
export type FeeStatus = "pending" | "submitted" | "verified";

export interface User {
  id: string;
  password: string;
  role: Role;
  name: string;
  linkedId: string;
}

export interface Student {
  id: string;
  userId: string;
  admissionId: string;
  name: string;
  className: string;
  section: string;
  rollNo: number;
  parentName: string;
  parentPhone: string;
}

export interface Teacher {
  id: string;
  userId: string;
  employeeId: string;
  name: string;
  subject: string;
  className: string;
  section: string;
}

export interface AttendanceEntry {
  studentId: string;
  present: boolean;
}

export interface AttendanceRecord {
  id: string;
  className: string;
  section: string;
  date: string;
  markedByTeacherId: string;
  entries: AttendanceEntry[];
}

export interface FeeRecord {
  id: string;
  studentId: string;
  month: string;
  amount: number;
  status: FeeStatus;
  submittedAt?: string;
  verifiedAt?: string;
  submittedBy?: string;
  verifiedBy?: string;
}

export interface MarkRecord {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  outOf: number;
  term: string;
  publishedAt: string;
  publishedBy: string;
}

export interface TimetableEntry {
  id: string;
  className: string;
  section: string;
  day: string;
  period: string;
  subject: string;
  teacherName: string;
  time: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  publishedBy: string;
}

export interface Store {
  users: User[];
  students: Student[];
  teachers: Teacher[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  marks: MarkRecord[];
  timetable: TimetableEntry[];
  notices: Notice[];
}

const className = "Grade 9";
const section = "A";
const currentMonth = monthKey();

function buildDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() - offsetDays);
  return date.toISOString().slice(0, 10);
}

function initialStore(): Store {
  const users: User[] = [
    { id: "anthony012", password: "admin123", role: "admin", name: "Anthony Thomas", linkedId: "anthony012" },
    { id: "avantika012", password: "teacher123", role: "teacher", name: "Avantika", linkedId: "avantika012" },
    { id: "shantam012", password: "student123", role: "student", name: "Shantam Sinha", linkedId: "student01" },
    { id: "astik012", password: "student123", role: "student", name: "Astik", linkedId: "student02" },
    { id: "ahaan012", password: "student123", role: "student", name: "Ahaan", linkedId: "student03" },
    { id: "ayaan012", password: "student123", role: "student", name: "Ayaan", linkedId: "student04" },
    { id: "shubh012", password: "student123", role: "student", name: "Shubh", linkedId: "student05" },
    { id: "aarya012", password: "student123", role: "student", name: "Aarya", linkedId: "student06" }
  ];

  const students: Student[] = [
    { id: "student01", userId: "shantam012", admissionId: "ICS-1001", name: "Shantam Sinha", className, section, rollNo: 1, parentName: "Parent", parentPhone: "+91 98765 11111" },
    { id: "student02", userId: "astik012", admissionId: "ICS-1002", name: "Astik", className, section, rollNo: 2, parentName: "Parent", parentPhone: "+91 98765 11112" },
    { id: "student03", userId: "ahaan012", admissionId: "ICS-1003", name: "Ahaan", className, section, rollNo: 3, parentName: "Parent", parentPhone: "+91 98765 11113" },
    { id: "student04", userId: "ayaan012", admissionId: "ICS-1004", name: "Ayaan", className, section, rollNo: 4, parentName: "Parent", parentPhone: "+91 98765 11114" },
    { id: "student05", userId: "shubh012", admissionId: "ICS-1005", name: "Shubh", className, section, rollNo: 5, parentName: "Parent", parentPhone: "+91 98765 11115" },
    { id: "student06", userId: "aarya012", admissionId: "ICS-1006", name: "Aarya", className, section, rollNo: 6, parentName: "Parent", parentPhone: "+91 98765 11116" }
  ];

  const teachers: Teacher[] = [
    {
      id: "teacher01",
      userId: "avantika012",
      employeeId: "T-2001",
      name: "Avantika",
      subject: "All Subjects",
      className,
      section
    }
  ];

  const attendance: AttendanceRecord[] = Array.from({ length: 12 }, (_, index) => {
    const date = buildDate(12 - index);
    const present = index !== 4;
    return {
      id: `att-${index + 1}`,
      className,
      section,
      date,
      markedByTeacherId: "teacher01",
      entries: [
        { studentId: "student01", present },
        { studentId: "student02", present: index !== 3 },
        { studentId: "student03", present },
        { studentId: "student04", present: index < 6 },
        { studentId: "student05", present },
        { studentId: "student06", present: index !== 7 && index !== 8 }
      ]
    };
  });

  const fees: FeeRecord[] = [
    { id: "fee-1", studentId: "student01", month: currentMonth, amount: 5000, status: "pending" },
    { id: "fee-2", studentId: "student02", month: currentMonth, amount: 5000, status: "pending" },
    { id: "fee-3", studentId: "student03", month: currentMonth, amount: 5000, status: "pending" },
    { id: "fee-4", studentId: "student04", month: currentMonth, amount: 5000, status: "pending" },
    { id: "fee-5", studentId: "student05", month: currentMonth, amount: 5000, status: "pending" },
    { id: "fee-6", studentId: "student06", month: currentMonth, amount: 5000, status: "pending" }
  ];

  const marks: MarkRecord[] = [
    { id: "mark-1", studentId: "student01", subject: "Mathematics", score: 92, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-2", studentId: "student01", subject: "Science", score: 88, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-3", studentId: "student02", subject: "Mathematics", score: 78, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-4", studentId: "student02", subject: "Science", score: 82, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-5", studentId: "student03", subject: "Mathematics", score: 95, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-6", studentId: "student03", subject: "Science", score: 91, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-7", studentId: "student04", subject: "Mathematics", score: 67, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-8", studentId: "student04", subject: "Science", score: 73, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-9", studentId: "student05", subject: "Mathematics", score: 88, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-10", studentId: "student05", subject: "Science", score: 84, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-11", studentId: "student06", subject: "Mathematics", score: 71, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" },
    { id: "mark-12", studentId: "student06", subject: "Science", score: 79, outOf: 100, term: "Unit Test 1", publishedAt: new Date().toISOString(), publishedBy: "teacher01" }
  ];

  const timetable: TimetableEntry[] = [
    { id: "tt-1", className, section, day: "Monday", period: "Period 1", subject: "Mathematics", teacherName: "Avantika", time: "8:00 - 8:40" },
    { id: "tt-2", className, section, day: "Monday", period: "Period 2", subject: "Science", teacherName: "Avantika", time: "8:45 - 9:25" },
    { id: "tt-3", className, section, day: "Tuesday", period: "Period 1", subject: "English", teacherName: "Avantika", time: "8:00 - 8:40" },
    { id: "tt-4", className, section, day: "Tuesday", period: "Period 2", subject: "Mathematics", teacherName: "Avantika", time: "8:45 - 9:25" },
    { id: "tt-5", className, section, day: "Wednesday", period: "Period 1", subject: "Science", teacherName: "Avantika", time: "8:00 - 8:40" },
    { id: "tt-6", className, section, day: "Thursday", period: "Period 1", subject: "Social Studies", teacherName: "Avantika", time: "8:00 - 8:40" },
    { id: "tt-7", className, section, day: "Friday", period: "Period 1", subject: "Computer", teacherName: "Avantika", time: "8:00 - 8:40" }
  ];

  const notices: Notice[] = [
    {
      id: "notice-1",
      title: "Parent Meeting",
      body: "The monthly parent meeting will be held on Saturday at 10:00 AM in the auditorium.",
      publishedAt: new Date().toISOString(),
      publishedBy: "anthony012"
    },
    {
      id: "notice-2",
      title: "Science Workshop",
      body: "Class 9 students will attend a hands-on science workshop next Wednesday during the first period.",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      publishedBy: "anthony012"
    }
  ];

  return { users, students, teachers, attendance, fees, marks, timetable, notices };
}

declare global {
  // eslint-disable-next-line no-var
  var __irisConnectStore: Store | undefined;
}

export function getStore() {
  if (!globalThis.__irisConnectStore) {
    globalThis.__irisConnectStore = initialStore();
  }
  return globalThis.__irisConnectStore;
}

export function resetStore() {
  globalThis.__irisConnectStore = initialStore();
  return globalThis.__irisConnectStore;
}

export function findUserByCredentials(userId: string, password: string) {
  return getStore().users.find((user) => user.id === userId && user.password === password) ?? null;
}

export function findUserById(userId: string) {
  return getStore().users.find((user) => user.id === userId) ?? null;
}

export function getStudentByUserId(userId: string) {
  return getStore().students.find((student) => student.userId === userId) ?? null;
}

export function getTeacherByUserId(userId: string) {
  return getStore().teachers.find((teacher) => teacher.userId === userId) ?? null;
}

export function getStudentDashboard(userId: string) {
  const store = getStore();
  const student = store.students.find((item) => item.userId === userId) ?? null;
  if (!student) return null;

  const studentAttendance = store.attendance.filter((record) =>
    record.entries.some((entry) => entry.studentId === student.id)
  );
  const presentDays = studentAttendance.filter(
    (record) => record.entries.find((entry) => entry.studentId === student.id)?.present
  ).length;
  const fee = store.fees.find((item) => item.studentId === student.id && item.month === currentMonth) ?? null;
  const marks = store.marks
    .filter((item) => item.studentId === student.id)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return {
    id: student.id,
    student,
    attendance: {
      total: studentAttendance.length,
      present: presentDays,
      percentage: studentAttendance.length ? Math.round((presentDays / studentAttendance.length) * 100) : 0,
      records: studentAttendance
    },
    fee,
    marks: marks.slice(0, 3),
    timetable: store.timetable.filter(
      (entry) => entry.className === student.className && entry.section === student.section
    ),
    notices: [...store.notices].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3)
  };
}

export function getTeacherDashboard(userId: string) {
  const store = getStore();
  const teacher = store.teachers.find((item) => item.userId === userId) ?? null;
  if (!teacher) return null;

  const pendingFees = store.fees.filter((fee) => fee.status === "submitted").length;
  const todayAttendance = store.attendance.find((item) => item.date === todayISO() && item.className === teacher.className && item.section === teacher.section);

  return {
    teacher,
    pendingFees,
    todayAttendance,
    notices: [...store.notices].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3),
    students: store.students.filter((student) => student.className === teacher.className && student.section === teacher.section),
    marks: store.marks.filter((mark) => {
      const student = store.students.find((item) => item.id === mark.studentId);
      return student?.className === teacher.className && student?.section === teacher.section;
    })
  };
}

export function getAdminDashboard() {
  const store = getStore();
  return {
    studentCount: store.students.length,
    teacherCount: store.teachers.length,
    pendingFees: store.fees.filter((fee) => fee.status === "submitted").length,
    todayAttendance: store.attendance.filter((record) => record.date === todayISO()).length,
    notices: [...store.notices].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 4),
    submittedFees: store.fees.filter((fee) => fee.status === "submitted"),
    attendanceRecords: [...store.attendance].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  };
}

export function getStudentsList() {
  return [...getStore().students].sort((a, b) => a.rollNo - b.rollNo);
}

export function getTeachersList() {
  return [...getStore().teachers].sort((a, b) => a.name.localeCompare(b.name));
}

export function getNotices() {
  return [...getStore().notices].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getTimetable() {
  return [...getStore().timetable].sort((a, b) => a.day.localeCompare(b.day) || a.period.localeCompare(b.period));
}

export function getFeesForRole(userId: string, role: Role) {
  const store = getStore();
  if (role === "student") {
    const student = store.students.find((s) => s.userId === userId);
    if (!student) return [];
    return store.fees.filter((fee) => fee.studentId === student.id);
  }
  return [...store.fees];
}

export function getAttendanceForRole(role: Role, userId: string) {
  const store = getStore();
  if (role === "student") {
    const student = store.students.find((s) => s.userId === userId);
    if (!student) return [];
    return store.attendance.filter((record) => record.entries.some((entry) => entry.studentId === student.id));
  }

  if (role === "teacher") {
    const teacher = store.teachers.find((item) => item.userId === userId);
    if (!teacher) return [];
    return store.attendance.filter(
      (record) => record.className === teacher.className && record.section === teacher.section
    );
  }

  return [...store.attendance];
}

