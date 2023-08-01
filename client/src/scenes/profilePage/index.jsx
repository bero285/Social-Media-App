import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const isMyProfile = Boolean(_id === userId);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const getUser = async () => {
    const response = await fetch(`https://social-media-app-rmll.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;
  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "Block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0">
            <FriendListWidget userId={userId} />
          </Box>
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          {/* {isMyProfile ? <MyPostWidget picturePath={user.picturePath} /> : null} */}
          <Box m={isNonMobileScreen ? `-2rem 0` : " 2rem 0"}>
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ProfilePage;
