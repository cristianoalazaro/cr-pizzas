"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/store/auth";

type Props = {
  initialState: boolean;
};

export const LoginAreaButton = ({ initialState }: Props) => {
  const [authState, setAuthState] = useState(initialState);

  const { token, setToken, setOpen } = useAuth();

  useEffect(() => {
    setAuthState(token ? true : false);
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  if (authState) {
    return (
      <>
        <Link href="/pedidos">
          <Button>Meus pedidos</Button>
        </Link>
        <Button onClick={handleLogout}>Sair</Button>
      </>
    );
  }

  return <Button onClick={() => setOpen(true)}>Login / Cadastro</Button>;
};
