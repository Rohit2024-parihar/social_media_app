import React from "react";
import PostForm from "./PostForm";
import Feeds from "./Feeds";
import Header from "./Header";
import FollowingPanel from "./FollowingPanel";
import { Container, Grid, CssBaseline, Paper } from "@material-ui/core";
import Notification from "./Notification";

const styles = {
  parent: {
    background: "linear-gradient(180deg, #2196F3 30%, #BBDEFB 90%)"
  },
  containerStyle: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
  },
  followingPanel: {
    padding: "20px",
    borderRadius: "8px"
  },
  postPanel: {
    padding: "20px",
    borderRadius: "8px"
  }
};
const Home = () => {
  return (
    <div style={styles.parent}>
      <CssBaseline />
      <Container style={styles.containerStyle}>
        <Grid container spacing={4}>
          <Header />
          <Grid item md={4} xs={5}>
            <Paper elevation={3} style={styles.followingPanel}>
              <FollowingPanel />
            </Paper>
          </Grid>
          <Grid item md={8} xs={7}>
            <Paper elevation={3} style={styles.postPanel}>
              <PostForm />
              <Feeds />
            </Paper>
          </Grid>
        </Grid>

        <Notification />
      </Container>
    </div>
  );
};

export default Home;
