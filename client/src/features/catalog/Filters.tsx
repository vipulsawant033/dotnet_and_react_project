import { Box, Button, Paper } from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./cataclogSlice";
import CheckBoxButtons from "../../app/shared/components/CheckBoxButtons";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

type Props = {
  filtersData: {
    brands: string[];
    types: string[];
  };
};

export default function Filters({ filtersData }: Props) {
  const { orderBy, types, brands } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Box display={"flex"} flexDirection={"column"} gap={3}>
        <Paper>
          <Search />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <RadioButtonGroup
            options={sortOptions}
            onChange={(e) => dispatch(setOrderBy(e.target.value))}
            selectedValue={orderBy}
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <CheckBoxButtons
            items={filtersData.brands}
            checked={brands}
            onChange={(items: string[]) => dispatch(setBrands(items))}
          />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <CheckBoxButtons
            items={filtersData.types}
            checked={types}
            onChange={(items: string[]) => dispatch(setTypes(items))}
          />
        </Paper>
        <Button onClick={() => dispatch(resetParams())}>Reset</Button>
      </Box>
    </div>
  );
}
