import { getUsers } from "@/lib/get-users";
import AdminWrapper from "../../_components/admin-wrapper";
import EmployeeItem from "./_components/employee-item";
import { db } from "@/lib/db";
import { Role, Prisma } from "@prisma/client";
import { IEmployeeWithAppointments } from "@/types/types";

export default async function EmployeeListPage() {
  const employeesQuery: Prisma.UserFindManyArgs = {
    where: { role: Role.EMPLOYEE },

    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      employeeAppointments: {
        select: {
          id: true,
          employeeId: true,
          userId: true,
          date: true,
          isApproved: true,
        },
      },
    },
  };
  const employees = (await getUsers(employeesQuery)) as
    | IEmployeeWithAppointments[]
    | undefined;

  let content;
  if (employees && employees.length > 0) {
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
