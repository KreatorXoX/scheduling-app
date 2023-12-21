import EmployeeItem from "./_components/employee-item";
import { db } from "@/lib/db";

export default async function EmployeeListPage() {
  const employees = await db.user.findMany({
    where: { role: "employee" },

    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      employeeAppointments: {
        select: {
          id: true,
          employeeId: true,
          userId: true,
          date: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-28 w-full px-5 max-w-7xl">
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5">
        {employees.map((employee) => {
          return <EmployeeItem emp={employee} key={employee.id} />;
        })}
      </div>
    </main>
  );
}
