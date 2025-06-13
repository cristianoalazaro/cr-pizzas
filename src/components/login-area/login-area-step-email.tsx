import { useState } from "react";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";

type Props = {
  onValidate: (hasEmail: boolean, email: string) => void;
};

export const LoginAreaStepEmail = ({ onValidate }: Props) => {
  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [emailField, setEmailField] = useState("");

  const handleButton = () => {};

  return (
    <>
      <p className="mb-2">Digite seu e-mail</p>
      <CustomInput
        name="email"
        errors={errors}
        disabled={loading}
        type="email"
        value={emailField}
        onChange={(e) => setEmailField(e.target.value)}
      />
      <Button onClick={handleButton}>Continuar</Button>
    </>
  );
};
