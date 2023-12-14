import React from "react";

type Props = { children: React.ReactNode };

const HomeLayout = ({ children }: Props) => {
  return <div className="min-h-screen">{children}</div>;
};

export default HomeLayout;
