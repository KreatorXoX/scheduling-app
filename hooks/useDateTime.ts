import { create } from "zustand";

interface DateTimeState {
  date?: Date;
  time?: Date;
  setDate: (dateTime: Date | undefined) => void;
  setTime: (dateTime: Date | undefined) => void;
}

export const useDateTime = create<DateTimeState>()((set) => ({
  date: undefined,
  time: undefined,
  setDate: (dateTime) => set({ date: dateTime }),
  setTime: (dateTime) =>
    set((state) => {
      let newTime;

      if (state.time?.getTime() === dateTime?.getTime()) newTime = undefined;
      else newTime = dateTime;

      const updatedState = {
        ...state,
        time: newTime,
      };
      return updatedState;
    }),
}));
