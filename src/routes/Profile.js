import React, { useEffect } from "react";
import { authService, db } from "../firebase";
import { useHistory } from "react-router-dom";

const Profile = ({ user }) => {
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTweets = async () => {
    // filtering user
    const tweets = await db
      .collection("tweets")
      .where("creatorId", "==", user.uid)
      .orderBy("createdAt")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};

export default Profile;
