import {
  Button,
  Card,
  Grid2,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onLogin("mluukkai");
    navigate("/");
  };

  const Item = styled(Paper)(({ theme }) => ({}));

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Card sx={{ minWidth: 275, margin: "" }} style={{ padding: "1rem" }}>
        <form onSubmit={onSubmit}>
          <Grid2 container spacing={4}>
            <Item>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                size="small"
              />
            </Item>
            <Item>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                size="small"
              />
            </Item>

            <Button type="submit" variant="contained">
              Login
            </Button>
          </Grid2>
        </form>
      </Card>
    </div>
  );
};

export default Login;
