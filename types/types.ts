import { Role } from "@prisma/client";

export interface IAppointment {
  id: string;
  date: Date;
  userId: string;
  employeeId: string | null;
  user?: IUser | null;
  employee?: IUser | null;
  isApproved: boolean;
}

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: Role;
  appointments?: IAppointment[] | null;
}
export interface IEmployeeWithAppointments extends IUser {
  employeeAppointments?: IAppointment[] | null;
}

export interface IEmployeeAppointment {
  employeeAppointments?: IAppointment[] | [];
}
