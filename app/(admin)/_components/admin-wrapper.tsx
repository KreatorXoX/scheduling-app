type Props = { children: React.ReactNode };

const AdminWrapper = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-28 w-full px-5 max-w-7xl">
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5">
        {children}
      </div>
    </main>
  );
};

export default AdminWrapper;
