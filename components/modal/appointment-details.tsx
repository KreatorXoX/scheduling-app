"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppointmentModal } from "@/hooks/useAppointmentModal";
import AppointmentContent from "./appointment-content";

type Props = {};

const AppointmentDetailsModal = (props: Props) => {
  const isOpen = useAppointmentModal((state) => state.isOpen);
  const onClose = useAppointmentModal((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" p-4">
        <DialogHeader className="w-full text-neutral-700">
          <DialogTitle className="text-2xl dark:text-white text-neutral-700">
            Appointment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <AppointmentContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsModal;
