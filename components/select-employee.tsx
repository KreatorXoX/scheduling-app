"use client";

import React, { Dispatch, SetStateAction } from "react";

import { IEmployeeWithAppointments } from "@/types/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        {employess && employess.length > 0 ? (
          employess.map((emp) => (
            <SelectItem key={emp.id} value={`${emp.id}|${emp.name}`}>
              {emp.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem disabled value="no-emp">
            No employees Available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectEmployee;
