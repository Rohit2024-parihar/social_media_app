import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Avatar,
  CssBaseline,
  Link
} from "@material-ui/core";
import Notification from "./Notification";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const styles = {
  paper: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  avatar: {
    margin: "8px",
    backgroundColor: "#4caf50"
  },
  form: {
    width: "100%",
    marginTop: "16px"
  },
  submit: {
    margin: "16px 0",
    backgroundColor: "#4caf50",
    color: "white"
  },
  forgotPassword: {
    marginTop: "10px"
  },
  error: {
    color: "red",
    marginBottom: "10px"
  }
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username: user, password: pass } = useSelector(
    (state) => state.user.userInfo
  );
  const [username, setUsername] = useState(user);
  const [password, setPassword] = useState(pass);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const validUsername = user;
    const validPassword = pass;

    if (username === validUsername && password === validPassword) {
      // Dispatch the user info to Redux
      dispatch(
        login({
          username,
          password,
          message: `Welcome ${username}! You have successfully logged in.`
        })
      );
      // Redirect to the Home page
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={styles.paper}>
        <Avatar style={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={styles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={styles.error}>{error}</p>}
          <Button
            type="button"
            fullWidth
            variant="contained"
            style={styles.submit}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link
            href="#"
            variant="body2"
            onClick={handleForgotPassword}
            style={styles.forgotPassword}
          >
            Forgot Password?
          </Link>
        </form>
        <Notification />
      </Paper>
    </Container>
  );
};

export default Login;
