import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
};

export default function CheckBoxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked);

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);

  const handleToggle = (value: string) => {
    const updatedChecked = checkedItems?.includes(value)
      ? checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];
    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <div>
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={checkedItems.includes(item)}
                color="secondary"
                onChange={() => handleToggle(item)}
                sx={{ py: 0.7, fontSize: 40 }}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </div>
  );
}
