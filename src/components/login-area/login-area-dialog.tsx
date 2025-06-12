"use client";

import { useAuth } from "@/store/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Divide } from "lucide-react";

type Steps = "EMAIL" | "SIGNUP" | "SIGNIN";

export const LoginAreaDialog = () => {
  const [step, setStep] = useState<Steps>("EMAIL");

  const { open, setOpen } = useAuth();

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step !== "EMAIL" && (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setStep("EMAIL")}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}
            {step === "EMAIL" && "Login / Cadastro"}
            {step === "SIGNUP" && "Cadastro"}
            {step === "SIGNIN" && "Login"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {step === "EMAIL" && <div>Email</div>}
          {step === "SIGNIN" && <div>Login</div>}
          {step === "SIGNUP" && <div>Cadastro</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
