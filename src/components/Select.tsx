import { ChangeEventHandler, MouseEventHandler } from "react";

type Props = {
  label?: string;
  multiple?: boolean;
  selected?: {
    [value: string]: string;
  };
  items: Array<{ id: string; value: string }>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onClick?: MouseEventHandler<HTMLSelectElement>;
};

const Select = ({
  label,
  multiple = false,
  items,
  selected = {},
  onChange,
  onClick,
}: Props) => {
  return (
    <div>
      {label && <label className="mr-3 sm:block">{label}</label>}
      <select
        className="px-2 py-1 border rounded-md"
        multiple={multiple}
        onClick={onClick}
        onChange={onChange}
      >
        {items.map((item) => {
          if (multiple && selected[item.value]) {
            return (
              <option className="w-64" key={item.id} value={item.value}>
                {item.value} &#10003;
              </option>
            );
          }
          return (
            <option className="w-64" key={item.id} value={item.value}>
              {item.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
