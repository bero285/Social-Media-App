import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useEffect, useState } from "react";
import { setFriendsShownRefresh } from "state";
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const [changeFriends, setChangeFriends] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [friendState, setFriendState] = useState(false);
  const [effectFreidnState, setEffectFreidnState] = useState(false);
  useEffect(() => {
    if (friends) {
      if (friends.find((friend) => friend._id === friendId)) {
        setFriendState(true);
      } else {
        setFriendState(false);
      }
    } else {
      setFriendState(false);
    }
   
  }, [effectFreidnState]);

  useEffect(() => {
    if (friends) {
      if (friends.find((friend) => friend._id === friendId)) {
        setFriendState(true);
      } else {
        setFriendState(false);
      }
    } else {
      setFriendState(false);
    }
 
  }, []);
  // const isFriend = friends
  //   ? friends.find((friend) => friend._id === friendId)
  //   : false;
  // const a = friends.map((friend) => console.log(friend._id));

  // const isFriend = Boolean(friends.find((friend) => friend._id === friendId));

  // useEffect(() => {
  //   console.log("friends", friends);
  //   console.log(isFriend);
  //   console.log(_id);
  //   console.log(friendId);
  // }, []);

  const isMe = Boolean(_id === friendId);
  const patchFriend = async () => {
    const response = await fetch(
      `https://social-media-app-rmll.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    dispatch(setFriendsShownRefresh());
    setEffectFreidnState(!effectFreidnState);
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isMe ? (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {friendState ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : null}
    </FlexBetween>
  );
};

export default Friend;
