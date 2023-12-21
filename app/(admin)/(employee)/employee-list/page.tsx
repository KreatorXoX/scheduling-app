import AdminWrapper from "../../_components/admin-wrapper";
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

  let content;
  if (employees.length > 0) {
    content = (
      <AdminWrapper>
        {employees.map((employee) => (
          <EmployeeItem key={employee.id} emp={employee} />
        ))}
      </AdminWrapper>
    );
  } else {
    content = (
      <div className="relative w-full h-[calc(100vh-20rem)]">
        <h1 className="text-2xl text-center mt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          No employees created yet.
        </h1>
      </div>
    );
  }
  return content;
}
