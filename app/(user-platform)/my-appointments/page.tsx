import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/config/auth";
type Props = {};

const MyAppointmentsPage = async (props: Props) => {
  const session = await auth();

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center pt-28 space-y-10">
      <h2>You dont have any appointments</h2>
      <Button asChild size={"lg"} variant={"primary"}>
        <Link href={"/make-appointment"}>Make a new Appointment</Link>
      </Button>
    </div>
  );
};

export default MyAppointmentsPage;
