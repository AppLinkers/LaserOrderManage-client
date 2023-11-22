import { ChangeEvent, useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return [value, onChange] as const;
};

export const useInputWithRegex = (
  regex: string | RegExp,
  replaceValue: string,
) => {
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.replace(regex, replaceValue));
  };

  return [value, onChange] as const;
};

export const useInputWithMaxLength = (maxLength: number) => {
  const [value, setValue] = useState("");

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const input = event.target.value;
    if (input.length <= maxLength) {
      setValue(input);
    }
  };

  return {value, setValue, onChange} as const;
};
