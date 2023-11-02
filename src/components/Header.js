import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Button
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/features/searchSlice";
import { login } from "../redux/features/userSlice";

const styles = {
  appbar: {
    backgroundColor: "#2196F3",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar: {
    marginRight: "12px"
  },
  heading: {
    fontWeight: "bold",
    color: "white"
  },
  searchContainer: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)"
  },
  searchIcon: {
    padding: "8px",
    color: "#2196F3"
  },
  searchBox: {
    padding: "8px",
    width: "150px",
    color: "black",
    fontSize: "14px"
  },
  childContainer: {
    position: "relative",
    borderRadius: "4px",
    backgroundColor: "white",
    marginRight: "16px"
  },
  parentContainer: { display: "flex", alignItems: "center" },
  loginButton: {
    marginLeft: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "4px"
  }
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTermLocal] = useState("");
  const { username, password } = useSelector((state) => state.user.userInfo);
  const handleSearch = (e) => {
    setSearchTermLocal(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLogin = () => {
    dispatch(
      login({
        username,
        password,
        message: `You have Logged out!`
      })
    );
    navigate("/login");
  };

  return (
    <AppBar position="static" style={styles.appbar}>
      <Toolbar style={styles.toolbar}>
        <div style={styles.parentContainer}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={styles.heading}>
            Social Media App
          </Typography>
        </div>
        <div style={styles.parentContainer}>
          <div style={styles.childContainer}>
            <InputBase
              placeholder="Search..."
              style={styles.searchBox}
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
            />
            <div style={styles.searchContainer}>
              <IconButton onClick={handleSearch} style={styles.searchIcon}>
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <Button color="inherit">
            <Avatar src="https://i.pravatar.cc/40" alt="User Avatar" />
          </Button>
          <Button
            variant="contained"
            style={styles.loginButton}
            onClick={handleLogin}
          >
            {!username ? "Login" : "Logout"}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
