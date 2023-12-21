export type DateTime = {
  date?: Date;
  time?: Date;
};

export interface IAppointment {
  id: string;
  date: Date;
  userId: string;
  employeeId: string | null;
  user?: IUser | null;
  employee?: IUser | null;
}

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  appointments?: IAppointment[] | null;
}
export interface IEmployeeWithAppointments extends IUser {
  employeeAppointments?: IAppointment[] | null;
}
