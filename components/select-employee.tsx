"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEmployeeWithAppointments } from "@/types/types";

import React, { Dispatch, SetStateAction } from "react";

type Props = {
  employess?: IEmployeeWithAppointments[];
  onClick: Dispatch<SetStateAction<string | undefined>>;
};

const SelectEmployee = ({ employess, onClick }: Props) => {
  return (
    <Select required onValueChange={(value) => onClick(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Employees" />
      </SelectTrigger>
      <SelectContent>
        {employess?.map((emp) => (
          <SelectItem key={emp.id} value={`${emp.id}|${emp.name}`}>
            {emp.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectEmployee;
