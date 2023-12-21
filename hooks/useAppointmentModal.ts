import { IAppointment } from "@/types/types";
import { create } from "zustand";

interface AppointmentModalState {
  appointment?: IAppointment;
  isOpen: boolean;
  onOpen: (appointment: IAppointment) => void;
  onClose: () => void;
}

export const useAppointmentModal = create<AppointmentModalState>()((set) => ({
  appointment: undefined,
  isOpen: false,
  onOpen: (appointment) => set({ isOpen: true, appointment: appointment }),
  onClose: () => set({ isOpen: false, appointment: undefined }),
}));
