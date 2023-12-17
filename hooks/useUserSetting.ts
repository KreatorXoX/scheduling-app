import { create } from "zustand";

interface UserSettingState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUserSetting = create<UserSettingState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
