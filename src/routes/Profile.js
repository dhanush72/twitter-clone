import React, { useState } from "react";
import { authService } from "../firebase";
import { useHistory } from "react-router-dom";

const Profile = ({ user }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);

  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // const getMyTweets = async () => {
  //   // filtering user
  //   const tweets = await db
  //     .collection("tweets")
  //     .where("creatorId", "==", user.uid)
  //     .orderBy("createdAt")
  //     .get();
  //   console.log(tweets.docs.map((doc) => doc.data()));
  // };

  const onChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.displayName !== newDisplayName) {
      await user.updateProfile({
        displayName: newDisplayName,
      });
    }
    setNewDisplayName(user.displayName);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};

export default Profile;
