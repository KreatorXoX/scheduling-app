export type DateTime = {
  date?: Date;
  time?: Date;
};

export type Appointment = {
  id: string;
  date: Date;
  userId: string;
  employeeId: string;
};

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  appointments?: Appointment[] | null;
}
export interface IEmployeeWithAppointments extends IUser {
  employeeAppointments?: Appointment[] | null;
}
