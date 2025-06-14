import { ComponentProps } from "react";
import { Input } from "../ui/input";
import { checkFieldErrors } from "@/lib/utils";

type Props = ComponentProps<"input"> & {
  name: string;
  errors: any;
};

export const CustomInput = (props: Props) => {
  const error = checkFieldErrors(props.name, props.errors);

  return (
    <>
      <Input {...props} className={`${error ? "border border-red-800" : ""}`} />
      {error && <div className="mt-1 text-sm text-red-800">{error}</div>}
    </>
  );
};
