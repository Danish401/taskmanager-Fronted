
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPostsByUserId } from "../redux/postSlice";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FcEditImage } from "react-icons/fc";
const UploadBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
});

const PostCard = styled(Card)({
  maxWidth: 345,
  margin: "20px auto",
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
  borderRadius: "8px",
});

const PostForm = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { user, token } = useSelector((state) => state.auth); // Get token from auth slice
  const userId = user?._id;

  const [formData, setFormData] = useState({
    caption: "",
    photo: null,
  });

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  // Handle caption change
  const handleCaptionChange = (e) => {
    setFormData({ ...formData, caption: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.caption || !formData.photo) {
      alert("Please provide both a caption and an image.");
      return;
    }

    const data = new FormData();
    data.append("caption", formData.caption);
    data.append("photo", formData.photo);
    data.append("user", userId); // Add user ID to the formData payload

    dispatch(createPost({ formData: data, token })).then(() => {
      // Reset form after successful submission
      setFormData({ caption: "", photo: null });
    });
  };

  useEffect(() => {
    if (userId) {
      dispatch(getPostsByUserId(userId)); // Fetch posts by user ID on component mount
    }
  }, [dispatch, userId]);

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {/* Upload Form */}
      <UploadBox>
      <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="h5"
        sx={{ color: "#00897b", fontWeight: "bold", display: "flex", alignItems: "center" }}
      >
        Create a Post
      </Typography>
      <FcEditImage style={{ color: "#004d40", marginLeft: "8px", fontSize: "1.5rem" }} />
    </Box>
        <TextField
          fullWidth
          variant="outlined"
          label="Write a caption..."
          value={formData.caption}
          onChange={handleCaptionChange}
          sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#ffffff" } }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ backgroundColor: "#26a69a", color: "#ffffff" }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#5b5bd6",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#4045b2" },
          }}
          disabled={!formData.caption || !formData.photo}
        >
          Post
        </Button>
      </UploadBox>

      {/* Posts Section */}
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {posts.map((post) => (
            <PostCard key={post._id}>
              <CardMedia
                component="img"
                alt={post.caption}
                height="200"
                image={
                  post.photo.endsWith(".heic")
                    ? post.photo.replace(/\.heic$/, ".jpg")
                    : post.photo
                }
                onError={(e) => (e.target.src = "/placeholder-image.jpg")}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#00897b", fontWeight: "bold" }}
                >
                  {post.caption}
                </Typography>
              </CardContent>
            </PostCard>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PostForm;
