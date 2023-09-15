import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WiddgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFriends } from "state";

const FriendListWidget = ({ userId, myId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const friendState = useSelector((state) => state.friendState);
  const [changeFriends, setChangeFriends] = useState();

  const getFriends = async () => {
    const response = await fetch(
      `random-link/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    getFriends();
  }, [friendState]);

  return (
    <WiddgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
              userId={userId}
            />
          ))
        ) : (
          <h1>no Friends</h1>
        )}
      </Box>
    </WiddgetWrapper>
  );
};

export default FriendListWidget;
