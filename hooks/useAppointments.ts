import { Appointment } from "@/types/types";
import { create } from "zustand";

interface AppointmentState {
  appointments?: Appointment[];
  setAppointment: (appointmentDate: Date) => void;
}

export const useAppointments = create<AppointmentState>()((set) => ({
  appointments: undefined,
  setAppointment: (appointmentDate) =>
    set((state) => {
      const newId = state.appointments?.length
        ? state.appointments?.length + 1
        : 1;

      let updatedAppointments;
      if (state.appointments) {
        updatedAppointments = [
          ...state.appointments,
          { id: newId, date: appointmentDate },
        ];
      } else {
        updatedAppointments = [{ id: newId, date: appointmentDate }];
      }

      const updatedState = {
        ...state,
        appointments: updatedAppointments,
      };

      return updatedState;
    }),
}));
