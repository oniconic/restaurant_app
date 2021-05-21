import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

type SelectProps = React.HTMLProps<HTMLInputElement> & {
  valueItem?: string | number;
  placeholderText?: string;
  name?: string;
  helperText?: string;
  options: Array<any>;
  onChangeFn?: any;
  control: any;
  isCleared?: boolean;
  isMultiple?: boolean;
  isDisabled?: boolean;
};

export default function SelectText(props: SelectProps) {
  const {
    name = "",
    valueItem,
    placeholderText = "กรุณาเลือก",
    helperText,
    options,
    onChangeFn,
    control,
    isCleared = true,
    isMultiple = false,
    isDisabled = false,
  } = props;

  const [optionItems, setOptionItems] = useState<Array<Record<string, any>>>(
    []
  );
  const [style, setStyle] = useState<Record<string, any>>({});
  const [value, setValue] = useState<string | number>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setValue(valueItem!);
  }, [valueItem]);

  useEffect(() => {
    if (Array.isArray(options) && options.length > 0) {
      if (isMultiple == false) {
        const items = options.map((option) => {
          return { value: option.id, label: option.name };
        });

        setOptionItems(items);
      } else {
        setOptionItems(options);
      }
    }

    if (options.length === 0) {
      setOptionItems(() => options);
    }
  }, [options]);

  useEffect(() => {
    let style = {
      input: () => ({
        paddingTop: 10,
        paddingBottom: 10,
      }),
      control: () => ({
        alignItems: "center",
        backgroundColor: Boolean(isDisabled)
          ? "hsl(220, 13%, 91%, 1)"
          : "hsl(0, 0%, 100%)",
        border: 0,
        boxShadow: "none",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        minHeight: 38,
        outline: "0!important",
        position: "relative",
        transition: "all 100ms",
        boxSizing: "border-box",
        borderRadius: "0.25rem",
      }),
      container: () => ({
        border: !isEmpty(helperText)
          ? "1px solid #f87171"
          : "1px solid #9ca3af",
        borderRadius: "0.25rem",
      }),
      placeholder: () => ({
        fontSize: "14px",
        color: "hsl(0, 0%, 65%)",
        marginLeft: "2px",
        marginRight: "2px",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        boxSizing: "border-box",
      }),
    };

    setStyle(style);
    setDisabled(isDisabled);
  }, [helperText, isDisabled]);

  const formatGroupLabel = (data: Record<string, any>) => {
    return (
      <div className="border-b-2 flex text-xl">
        <span className="flex-1">{data.label}</span>
        <span>{data.options.length}</span>
      </div>
    );
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ onChange, ref: inputRef }) => (
          <Select
            className={
              "border focus:outline-none focus:shadow-outline outline-none " +
              "relative rounded text-gray-700 text-sm w-full placeholder-gray-400"
            }
            classNamePrefix="select"
            value={
              value
                ? optionItems.find((option) => option.value === value)
                : null
            }
            name={name}
            onChange={(option: Record<string, any>) => {
              onChangeFn(option?.value);
              setValue(option?.value);
              onChange(option?.value);
            }}
            ref={inputRef}
            options={optionItems}
            placeholder={placeholderText}
            noOptionsMessage={() => "ไม่มีข้อมูล"}
            styles={style}
            isClearable={isCleared}
            formatGroupLabel={formatGroupLabel}
            isDisabled={disabled}
          />
        )}
      ></Controller>
      {!isEmpty(helperText) && (
        <span className="text-red-400 text-sm">{helperText}</span>
      )}
    </>
  );
}
