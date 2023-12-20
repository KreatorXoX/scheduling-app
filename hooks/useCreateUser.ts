import { create } from "zustand";

interface CreateUserState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateUserModal = create<CreateUserState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
