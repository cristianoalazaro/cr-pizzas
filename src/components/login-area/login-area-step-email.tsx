"use client";

import { useState } from "react";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import z, { string } from "zod";
import { api } from "@/lib/axios";

const schema = z.object({
  email: string().email("E-mail inválido"),
});

type Props = {
  onValidate: (hasEmail: boolean, email: string) => void;
};

export const LoginAreaStepEmail = ({ onValidate }: Props) => {
  const [emailField, setEmailField] = useState("");
  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleButton = async () => {
    setErrors(null);

    const validData = schema.safeParse({ email: emailField });
    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }

    try {
      setLoading(true);

      const emailReq = await api.post("/auth/validate_email", {
        email: validData.data.email,
      });

      setLoading(false);

      onValidate(emailReq.data.exists ? true : false, validData.data.email);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p>Digite seu e-mail</p>
      <CustomInput
        name="email"
        errors={errors}
        value={emailField}
        onChange={(e) => setEmailField(e.target.value)}
        disabled={loading}
        type="email"
      />
      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </div>
  );
};
