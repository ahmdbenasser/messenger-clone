import React from "react";
import ReactSelect from "react-select";

type Props = {
  label: string;
  disabled?: boolean;
  value?: Record<string, any>;
  options: Record<string, any>[];
  onChange: (value: Record<string, any>) => void;
};
const Select = ({
  label,
  onChange,
  options,
  value,
  disabled,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-900">{label}</label>
      <ReactSelect
        isDisabled={disabled}
        onChange={onChange}
        options={options}
        value={value}
        isMulti
        classNames={{
          control: () => "text-sm",
        }}
      />
    </div>
  );
};

export default Select;
