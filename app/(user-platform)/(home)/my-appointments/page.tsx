import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const MyAppointmentsPage = (props: Props) => {
  return (
    <div className="w-full min-h-screen relative flex flex-col items-center pt-20 space-y-10">
      <h2>You dont have any appointments</h2>
      <Button asChild size={"lg"} variant={"primary"}>
        <Link href={"/make-appointment"}>Make a new Appointment</Link>
      </Button>
    </div>
  );
};

export default MyAppointmentsPage;
