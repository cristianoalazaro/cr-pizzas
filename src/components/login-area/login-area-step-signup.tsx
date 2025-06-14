import { useAuth } from "@/store/auth";
import { useState } from "react";
import z from "zod";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";
import bcrypt from "bcryptjs";

const schema = z
  .object({
    name: z.string().min(5, "Nome deve ter pelo menos 5 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(5, "Senha deve ter pelo menos 5 caracteres"),
    passwordConfirm: z
      .string()
      .min(5, "Senha deve ter pelo menos 5 caracteres"),
  })
  .refine((data: any) => data.password === data.passwordConfirm, {
    message: "As senhas digitadas não são iguais",
    path: ["passwordConfirm"],
  });

type Props = {
  email: string;
};

export const LoginAreaStepSignup = ({ email }: Props) => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");
  const [passwordConfirmField, setPasswordConfirmField] = useState("");

  const handleButton = async () => {
    setErrors(null);

    const validData = schema.safeParse({
      name: nameField,
      email: emailField,
      password: passwordField,
      passwordConfirm: passwordConfirmField,
    });

    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }

    try {
      setLoading(true);

      const signupReq = await api.post("/auth/signup", {
        name: validData.data.name,
        email: validData.data.email,
        password: validData.data.password,
      });

      if (!signupReq.data.token) {
        alert(signupReq.data.error);
      } else {
        auth.setToken(signupReq.data.token);
        auth.setOpen(false);
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="mb-2">Digite seu nome</p>
        <CustomInput
          name="name"
          errors={errors}
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          disabled={loading}
          type="text"
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="mb-2">Digite seu email</p>
        <CustomInput
          name="email"
          errors={errors}
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
          disabled={loading}
          type="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="mb-2">Digite sua senha</p>
        <CustomInput
          name="password"
          errors={errors}
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
          disabled={loading}
          type="password"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p>Digite novamente sua senha</p>
        <CustomInput
          name="passwordConfirm"
          errors={errors}
          value={passwordConfirmField}
          onChange={(e) => setPasswordConfirmField(e.target.value)}
          disabled={loading}
          type="password"
        />
      </div>

      <Button onClick={handleButton} disabled={loading}>
        Gravar
      </Button>
    </>
  );
};
