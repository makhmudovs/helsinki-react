import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  console.log(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            -
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link className="nav-link" to="/notes">
              Notes
            </Link>
          </Button>
          <Button color="inherit">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </Button>
          <Button color="inherit">
            {user ? <em>{user} logged in</em> : <Link to="/login">Login</Link>}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
