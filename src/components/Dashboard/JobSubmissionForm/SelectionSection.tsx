import Select, { MultiValue, ActionMeta } from "react-select";

interface SelectionSectionProps {
  title: string;
  options: { value: string; label: string }[];
  selectedOptions: { value: string; label: string }[];
  setSelectedOptions: (options: { value: string; label: string }[]) => void;
  selectAll: boolean;
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectionSection = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  selectAll,
  handleSelectAll
}: SelectionSectionProps) => {
  // Generate a unique id for accessibility (HTML for labels doesn't work with react-select)
  const selectId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="bg-white rounded-lg p-6 border">
      {/* Associate label correctly with react-select */}
      <label htmlFor={selectId} className="text-sm text-gray-500 block">{title}</label>

      {/* Checkbox for Select All */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id={`select-all-${selectId}`}
          className="cursor-pointer"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <label htmlFor={`select-all-${selectId}`} className="text-sm text-gray-600 cursor-pointer">
          Select All {title}
        </label>
      </div>

      {/* Multi-Select Dropdown */}
      <Select
        isMulti
        inputId={selectId} // Fixes the label issue
        options={options}
        value={selectedOptions}
        onChange={(newValue: MultiValue<{ value: string; label: string }>, _: ActionMeta<{ value: string; label: string }>) =>
          setSelectedOptions([...newValue] as { value: string; label: string }[])
        }
        components={{
          DropdownIndicator: () => null, // Removes dropdown arrow
          ClearIndicator: () => null // Removes the clear (X) button
        }}
        className="mt-2"
      />
    </div>
  );
};

export default SelectionSection;
