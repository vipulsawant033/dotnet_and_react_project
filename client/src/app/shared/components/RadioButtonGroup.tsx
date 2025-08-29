import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};

export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <FormControl>
      {options.map(({ value, label }) => (
        <RadioGroup onChange={onChange} value={selectedValue} sx={{ my: 0 }}>
          <FormControlLabel
            key={label}
            control={<Radio sx={{ py: 0.7 }} color="secondary" />}
            label={label}
            value={value}
          />
        </RadioGroup>
      ))}
    </FormControl>
  );
}
