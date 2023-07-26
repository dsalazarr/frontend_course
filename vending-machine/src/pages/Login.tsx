import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setUserId,
  updateBalance,
} from "../features/vendingMachineSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router";
import { api } from "../api";

export const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const globalUsername = useSelector(
    (state: RootState) => state.vendingMachine.name
  );

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (globalUsername) {
      navigate("/vending-machine");
    }
  }, [navigate, globalUsername]);

  const handleOnClick = useCallback(
    async (username: string) => {
      try {
        const response = await api.getUser(username);
        if (response.data.length < 1) {
          setError("There is no user registered with that username");
          return;
        }
        const user = response.data[0];
        dispatch(setName(user.first_name + user.last_name));
        dispatch(setUserId(user.id));
        dispatch(updateBalance(parseFloat(user.credit)));
        navigate("/vending-machine");
      } catch (error) {
        setError(error.data.error);
      }
    },
    [navigate, dispatch]
  );
  let errorComponent;
  if (error) {
    errorComponent = (
      <Grid item xs={12}>
        <Alert severity="error">{error}</Alert>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      {errorComponent}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              id="username"
              name="username"
              label="Email"
              fullWidth
              onChange={(e) => onUsernameChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              onClick={() => handleOnClick(username)}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
