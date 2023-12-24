"use client";

import { useRouter } from "next/navigation";

import { IEmployeeWithAppointments } from "@/types/types";

import EmployeeAvatar from "./employee-avatar";
import EmployeeOptions from "./employee-options";

type Props = { emp: IEmployeeWithAppointments };

const EmployeeItem = ({ emp }: Props) => {
  const router = useRouter();
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-sm p-2 flex items-center justify-between text-sm">
      <EmployeeAvatar name={emp.name} />
      <div className="flex flex-col gap-1">
        <div className="">{emp.name}</div>
        <div className="text-xs italic">{emp.email}</div>
        <div className="mt-1">
          Appointments : <span>{emp.employeeAppointments?.length}</span>
        </div>
      </div>
      <EmployeeOptions />
    </div>
  );
};

export default EmployeeItem;
