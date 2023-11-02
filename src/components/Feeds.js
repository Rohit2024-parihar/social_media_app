import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  CardActions,
  Divider,
  Modal,
  TextField,
  Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { updatePost, removePost } from "../redux/features/postSlice";

const Feeds = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  const searchTerm = useSelector((state) => state.searchTerm);

  const [likes, setLikes] = useState({});
  const [editPostId, setEditPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPosts = allPosts.filter((post) => {
    return (
      post?.content.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      post?.username.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  });

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId]
    }));
  };

  const handleEdit = (postId, postContent) => {
    setEditPostId(postId);
    setEditPostContent(postContent);
    setIsModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (editPostId !== null) {
      dispatch(updatePost({ id: editPostId, content: editPostContent }));
      setIsModalOpen(false);
      setEditPostId(null);
      setEditPostContent("");
    }
  };

  const handleDelete = (user) => {
    dispatch(removePost(user));
  };

  return (
    <div>
      <List>
        {filteredPosts.map(
          (post, index) =>
            post.isFollowing && (
              <React.Fragment key={post.id}>
                <ListItem>
                  <Card
                    variant="outlined"
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      backgroundColor: "#f5f5f5", // Light background color
                      marginBottom: "16px"
                    }}
                  >
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "16px"
                        }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: "#1976D2",
                            marginRight: "12px"
                          }}
                          src={post.avatarUrl}
                        />

                        <div>
                          <Typography
                            variant="h6"
                            style={{
                              fontWeight: "bold",
                              color: "#333",
                              marginBottom: "8px"
                            }}
                          >
                            {post.username}
                          </Typography>
                          <Typography
                            variant="caption"
                            style={{ color: "#666" }}
                          >
                            {new Date(post.timestamp).toLocaleString()}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="body1"
                        style={{ marginBottom: "16px", color: "#333" }}
                      >
                        {post.content}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "#f5f5f5" // Light background color
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "8px"
                        }}
                      >
                        <IconButton
                          edge="start"
                          color={likes[post.id] ? "secondary" : "inherit"}
                          aria-label="like"
                          onClick={() => handleLike(post.id)}
                        >
                          <FavoriteIcon />
                        </IconButton>
                        <Typography
                          variant="caption"
                          style={{ marginLeft: "8px" }}
                        >
                          {likes[post.id] ? "Liked!" : "Like"}
                        </Typography>
                      </div>
                      {post?.author === true && (
                        <div>
                          <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="edit"
                            onClick={() => handleEdit(post.id, post.content)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="delete"
                            onClick={() => handleDelete(post)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </ListItem>
                {index < filteredPosts.length - 1 && <Divider />}
              </React.Fragment>
            )
        )}
      </List>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          style={{
            position: "absolute",
            width: "300px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
          }}
        >
          <Typography variant="h6" style={{ marginBottom: "16px" }}>
            Edit Post
          </Typography>
          <TextField
            multiline
            minRows={4}
            fullWidth
            variant="outlined"
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={handleEditSubmit}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Feeds;
