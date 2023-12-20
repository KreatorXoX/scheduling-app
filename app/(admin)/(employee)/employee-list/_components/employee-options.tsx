import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const EmployeeOptions = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      <Button
        size={"sm"}
        variant={"primary"}
        onClick={() => {
          // TODO: Create employee dialog component to show details
        }}
      >
        Edit
      </Button>
      <Button size={"sm"} variant={"destructive"}>
        Del
      </Button>
    </div>
  );
};

export default EmployeeOptions;
