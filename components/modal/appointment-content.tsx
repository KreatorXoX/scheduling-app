"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Info } from "lucide-react";
import toast from "react-hot-toast";

import { assignAppointment } from "@/actions/assign-employee";

import { useAppointmentModal } from "@/hooks/useAppointmentModal";
import { useAction } from "@/hooks/useActions";

import SelectEmployee from "@/components/select-employee";
import CustomTooltip from "@/components/custom-tooltip";
import { Button } from "@/components/ui/button";
import FormSubmitButton from "@/components/form/form-submit";

const AppointmentContent = () => {
  const router = useRouter();
  const path = usePathname();

  const { execute } = useAction(assignAppointment, {
    onSuccess: () => {
      setIsEditing(false);
      toast.success("Employee assigned successfully");
      router.push(path);
    },
    onError: (err) => toast.error(err),
  });

  const appointment = useAppointmentModal((state) => state.appointment);

  const availableEmployees = useAppointmentModal(
    (state) => state.availableEmployees
  );

  const [isEditing, setIsEditing] = useState(false);

  const [employeeName, setEmployeeName] = useState<string | undefined>(
    appointment?.employee?.name ? appointment.employee.name : undefined
  );
  const [employeeId, setEmployeeId] = useState<string | undefined>(
    appointment?.employeeId ? appointment?.employeeId : undefined
  );

  const onSelectEmployeeHandler = (formData: FormData) => {
    const emp = formData.get("emp") as string;

    setEmployeeId(emp.split("|")[0]);
    setEmployeeName(emp.split("|")[1]);
    setIsEditing(false);

    if (appointment?.id)
      execute({
        appointmentId: appointment.id,
        employeeId: emp.split("|")[0],
      });
    else toast.error("Please provide appointment id");
  };
  return (
    <div className="flex flex-col gap-4 mt-4 mb-6 pl-4">
      <p className="relative ring-1 p-4 rounded">
        Date : {appointment?.date.toDateString()}
      </p>
      <p className="relative ring-1 p-4 rounded">Id : {appointment?.id}</p>
      <p className="relative ring-1 p-4 rounded">
        User : {appointment?.user?.name}
      </p>

      <div className="flex items-center gap-2 ">
        <div
          onClick={() => setIsEditing(true)}
          className="relative ring-1 p-4 rounded cursor-pointer "
        >
          Employee{" "}
          <CustomTooltip innerText="Click to add/edit employee info" side="top">
            <span className="absolute text-red-500 right-1 top-1">
              <Info className="w-3 h-3" />
            </span>{" "}
          </CustomTooltip>
          :{" "}
        </div>
        {!isEditing ? (
          <p>{employeeName || <span>Click to assign employee</span>}</p>
        ) : (
          <form
            action={onSelectEmployeeHandler}
            className="flex gap-6 items-center"
          >
            <SelectEmployee
              employess={availableEmployees}
              onClick={setEmployeeId}
            />
            <input
              type="text"
              className="hidden"
              id="emp"
              name="emp"
              value={employeeId}
              readOnly
            />
            <div className="flex items-center gap-2">
              <FormSubmitButton innerText="Save" />
              <Button
                type="button"
                size={"sm"}
                variant={"destructive"}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}{" "}
      </div>
    </div>
  );
};

export default AppointmentContent;
