import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const Home = () => {
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const { message } = useSelector((state) => state.user.userInfo);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="info"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
