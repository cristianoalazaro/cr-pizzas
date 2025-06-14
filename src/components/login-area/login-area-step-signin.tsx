import { useState } from "react";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import z from "zod";
import { api } from "@/lib/axios";
import { useAuth } from "@/store/auth";

type Props = {
  email: string;
};

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(5, "Senha deve ter pelo menos 5 caracteres"),
});

export const LoginAreaStepSignIn = ({ email }: Props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");

  const { setToken, setOpen } = useAuth();

  const handleButton = async () => {
    setErrors(null);

    const validData = schema.safeParse({
      email: emailField,
      password: passwordField,
    });

    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }

    try {
      setLoading(true);

      const signinReq = await api.post("/auth/signin", {
        email: validData.data.email,
        password: validData.data.password,
      });

      if (!signinReq.data.token) {
        alert(signinReq.data.error);
      } else {
        setToken(signinReq.data.token);
        setOpen(false);
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>Digite seu e-mail</p>
        <CustomInput
          name="email"
          errors={errors}
          type="email"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p>Digite sua senha</p>
        <CustomInput
          name="password"
          errors={errors}
          type="password"
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
          disabled={loading}
        />
      </div>

      <Button onClick={handleButton}>Entrar</Button>
    </>
  );
};
