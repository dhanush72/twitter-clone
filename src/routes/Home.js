import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Tweet from "../components/Tweet";

const Home = ({ user }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await db.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
      creatorId: user.uid,
    });
    setTweet("");
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="start typing...."
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="tweet" />
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
