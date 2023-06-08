import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WiddgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { SendSharp } from "@mui/icons-material";
import UserImage from "components/UserImage";
import { useNavigate } from "react-router-dom";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const navigate = useNavigate();
  const [isComments, setIsComments] = useState(false);
  const [newComments, setNewComments] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchComments = async () => {
    if (!newComments) {
      return;
    }
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comments`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          comment: newComments,
          commentPicturePath: user.picturePath,
          userName: `${user.firstName}  ${user.lastName}`,
        }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WiddgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        myId={loggedInUserId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Like Section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* Comment Section */}

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

          {/* CommentAppear Section */}
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <Box>
            <InputBase
              placeholder="Comment"
              value={newComments}
              disabled={false}
              onChange={(e) => {
                setNewComments(e.target.value);
              }}
              sx={{
                width: "85%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1.5rem",
                padding: "0.2rem 0.8rem",
              }}
            />
            <IconButton
              onClick={() => {
                setNewComments("");
                patchComments();
                patchComments();
              }}
            >
              <SendSharp />
            </IconButton>
          </Box>
          <Box sx={{ maxHeight: "300px", overflowY: "auto" }}>
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`} mt="0.3rem">
                <Divider />
                <Box
                  onClick={() => {
                    // navigate(0);
                    navigate(`/profile/${comment.userId}`);
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "1rem",
                    height: "3rem",
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                >
                  <UserImage size="30px" image={comment.commentPicturePath} />
                  <Typography
                    sx={{
                      color: main,
                      pl: "1rem",
                      "&:hover": {
                        color: "red",
                      },
                    }}
                  >
                    {comment.userName}
                  </Typography>
                </Box>
                <Typography sx={{ color: main, pl: "1rem", pt: "0.5rem" }}>
                  {comment.comment}
                </Typography>
              </Box>
            ))}
          </Box>
          <Divider />
        </Box>
      )}
    </WiddgetWrapper>
  );
};
export default PostWidget;
