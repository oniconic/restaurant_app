import isEmpty from "lodash/isEmpty";
import { useParams } from "react-router";
import get from "lodash/get";
import { useEffect, useState } from "react";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  inputRef?: any;
  valueItem?: string | number | undefined;
  placeholderText?: string;
  name?: string;
  className?: string;
  typeInput?: string;
  helperText?: string;
  isReadonly?: boolean;
  isDisabled?: true | false;
  onChangeFn?: (state: any) => void;
  onKeyPressFn?: (state: any) => void;
};

export default function InputText(props: InputProps) {
  const {
    className,
    name,
    valueItem,
    inputRef,
    typeInput = "text",
    placeholderText,
    helperText,
    isReadonly = false,
    isDisabled,
    onChangeFn,
    onKeyPressFn,
  } = props;

  const routeParams = useParams();
  const action = get(routeParams, "action");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(String(valueItem) || "");
  }, [valueItem]);

  useEffect(() => {
    setDisabled(() => Boolean(isDisabled) && true);
  }, [isDisabled]);

  useEffect(() => {
    if (name === "code") {
      if (action === "edit") {
        setDisabled(() => true);
      }

      setValue(value.trim());
    }
  }, [action, value]);

  return (
    <>
      <input
        name={name}
        type={typeInput}
        ref={inputRef}
        placeholder={placeholderText}
        value={value}
        className={
          (className
            ? ` ${className}`
            : "p-3 placeholder-gray-400 text-gray-700  text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full") +
          (helperText ? " border-red-400" : "") +
          (Boolean(isReadonly) ? " bg-gray-200" : " bg-white") +
          (Boolean(disabled) ? " bg-gray-200" : " bg-white")
        }
        readOnly={isReadonly}
        disabled={disabled}
        onChange={(element) => {
          if (typeof onChangeFn === "function") {
            onChangeFn(element.target.value);
          }

          setValue(element.target.value);
        }}
        onKeyPress={(event) => {
          if (typeof onKeyPressFn === "function") {
            onKeyPressFn(event);
          }
        }}
        autoComplete="off"
      />
      {!isEmpty(helperText) && (
        <span className="text-red-400 text-sm">{helperText}</span>
      )}
    </>
  );
}
