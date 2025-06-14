"use client";

import { useAuth } from "@/store/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Divide } from "lucide-react";
import { LoginAreaStepEmail } from "./login-area-step-email";
import { LoginAreaStepSignup } from "./login-area-step-signup";
import { LoginAreaStepSignIn } from "./login-area-step-signin";
import { getCookie } from "cookies-next/client";

type Steps = "EMAIL" | "SIGNUP" | "SIGNIN";

export const LoginAreaDialog = () => {
  const [step, setStep] = useState<Steps>("EMAIL");
  const [emailField, setEmailField] = useState("");

  const { open, setOpen, setToken } = useAuth();

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      setToken(token);
    }
  }, []);

  const handleStepEmail = (hasEmail: boolean, email: string) => {
    setEmailField(email);
    if (hasEmail) {
      setStep("SIGNIN");
    } else {
      setStep("SIGNUP");
    }
  };

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
          {step === "EMAIL" && (
            <LoginAreaStepEmail onValidate={handleStepEmail} />
          )}
          {step === "SIGNIN" && <LoginAreaStepSignIn email={emailField} />}
          {step === "SIGNUP" && <LoginAreaStepSignup email={emailField} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
