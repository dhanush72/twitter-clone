import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import Tweet from "../components/Tweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ user }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    let attachmentURL = "";
    // if there is an image
    if (attachment !== "") {
      // reference to storage
      const fileRef = storage.ref().child(`${user.uid}/${uuidv4()}`);
      const resp = await fileRef.putString(attachment, "data_url");
      attachmentURL = await resp.ref.getDownloadURL();
    }
    const dbtweet = {
      tweet,
      createdAt: Date.now(),
      creatorId: user.uid,
      attachmentURL,
    };

    await db.collection("tweets").add(dbtweet);
    setTweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };

  useEffect(() => {
    db.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  // upload image
  const onFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="start typing...."
          value={tweet}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          newTweet={tweet}
          isOwner={tweet.creatorId === user.uid}
        />
      ))}
    </>
  );
};

export default Home;
