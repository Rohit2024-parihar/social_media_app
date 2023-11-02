import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../redux/features/postSlice";
import CheckIcon from "@material-ui/icons/Check";

const FollowingPanel = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const allUser = useSelector((state) => state.posts);

  const handleToggleFollow = (user) => {
    dispatch(updatePost(user));
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: isSmallScreen ? "100%" : "400px",
        margin: "0 auto",
        maxHeight: "100vh",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#4caf50 #ddd"
      }}
    >
      <style>
        {`
          ::-webkit-scrollbar {
            width: 12px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #2196f3;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-track {
            background-color: #ecf0f1;
          }
        `}
      </style>
      <Typography
        variant="h6"
        style={{ marginBottom: "16px", color: "#333", textAlign: "center" }}
      >
        People You May Know
      </Typography>
      <List>
        {allUser?.map(
          (user, index) =>
            !user.author && (
              <React.Fragment key={user.id}>
                <ListItem
                  style={{
                    padding: "12px 0",
                    alignItems: "flex-start",
                    transition: "background-color 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    margin: "8px 0"
                  }}
                >
                  <Avatar
                    src={user.avatarUrl}
                    style={{
                      marginBottom: "8px",
                      width: "64px",
                      height: "64px"
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        style={{
                          fontWeight: "bold",
                          color: "#333",
                          textAlign: "center"
                        }}
                      >
                        {user.username}
                      </Typography>
                    }
                  />
                  <Button
                    variant={user.isFollowing ? "outlined" : "contained"}
                    color={user.isFollowing ? "default" : "primary"}
                    onClick={() => handleToggleFollow(user)}
                    startIcon={
                      <CheckIcon
                        style={{
                          color: user.isFollowing ? "#4caf50" : "white"
                        }}
                      />
                    }
                    style={{
                      marginTop: "8px",
                      textTransform: "none",
                      borderRadius: "20px"
                    }}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </Button>
                </ListItem>
              </React.Fragment>
            )
        )}
      </List>
    </div>
  );
};

export default FollowingPanel;
