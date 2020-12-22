import React, { useState } from "react";
import { authService } from "../firebase";
import { useHistory } from "react-router-dom";

const Profile = ({ user, refreshUser }) => {
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
    refreshUser();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <button className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
