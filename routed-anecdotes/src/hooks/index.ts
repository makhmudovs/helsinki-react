import { useState, ChangeEvent } from "react";

const useField = (type: string) => {
  const [value, setValue] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetval = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    resetval,
  };
};

export { useField };
