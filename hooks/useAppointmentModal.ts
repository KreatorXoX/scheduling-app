import { IAppointment, IEmployeeWithAppointments } from "@/types/types";
import { create } from "zustand";

interface AppointmentModalState {
  appointment?: IAppointment;
  availableEmployees?: IEmployeeWithAppointments[];
  isOpen: boolean;
  onOpen: (
    appointment: IAppointment,
    availableEmployees?: IEmployeeWithAppointments[]
  ) => void;
  onClose: () => void;
}

export const useAppointmentModal = create<AppointmentModalState>()((set) => ({
  appointment: undefined,
  availableEmployees: undefined,
  isOpen: false,
  onOpen: (appointment, employees) =>
    set({
      isOpen: true,
      appointment: appointment,
      availableEmployees: employees,
    }),
  onClose: () => set({ isOpen: false, appointment: undefined }),
}));
