import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  inputRef?: any;
  valueItem?: string;
  placeholderText?: string;
  name?: string;
  helperText?: string;
  isReadonly?: boolean;
  line?: number;
  onChangeFn: (state: any) => void;
};

export default function InputTextArea(props: InputProps) {
  const {
    className,
    name,
    valueItem,
    line = 3,
    inputRef,
    placeholderText,
    helperText,
    isReadonly = false,
    onChangeFn,
  } = props;

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(valueItem || "");
  }, [valueItem]);

  return (
    <>
      <textarea
        name={name}
        ref={inputRef}
        placeholder={placeholderText}
        value={value}
        rows={line}
        className={
          (className
            ? className
            : "px-3 py-3 placeholder-gray-400 text-gray-700 relative rounded text-sm border border-gray-400 " +
              "outline-none focus:outline-none focus:shadow-outline w-full ") +
          (helperText ? " border-red-400" : "") +
          (Boolean(isReadonly) ? " bg-gray-200" : " bg-white")
        }
        readOnly={isReadonly}
        onChange={(event) => {
          if (typeof onChangeFn === "function") {
            onChangeFn(event.target.value);
          }

          setValue(event.target.value);
        }}
      />
      {!isEmpty(helperText) && (
        <span className="text-red-400 text-sm">{helperText}</span>
      )}
    </>
  );
}
