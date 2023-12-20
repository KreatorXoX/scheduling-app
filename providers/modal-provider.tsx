"use client";
import React, { useEffect, useState } from "react";

import CreateUserModal from "@/components/modal/create-employee";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateUserModal />
    </>
  );
};

export default ModalProvider;
