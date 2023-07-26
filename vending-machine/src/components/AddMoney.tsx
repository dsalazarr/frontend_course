import { Button, Grid, Stack, Typography } from "@mui/material";

export interface AddMoneyProps {
  amounts: number[];
  addMoneyCallback: (amount: number) => void;
}

export const AddMoney = ({ amounts, addMoneyCallback }: AddMoneyProps) => {
  const buttons = amounts.map((value) => {
    return (
      <Grid item xs={4} key={value}>
        <Button
          data-testid="add-money-button"
          variant="outlined"
          onClick={() => addMoneyCallback(value)}
        >
          {value}E
        </Button>
      </Grid>
    );
  });
  return (
    <Stack spacing={2}>
      <Typography>Add money</Typography>
      <Grid container spacing={2}>
        {buttons}
      </Grid>
    </Stack>
  );
};
