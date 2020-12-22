import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Tweet from "../components/Tweet";
import TweetForm from "../components/TweetForm";

const Home = ({ user }) => {
  const [tweets, setTweets] = useState([]);

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
    <div className="container">
      <TweetForm user={user} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            newTweet={tweet}
            isOwner={tweet.creatorId === user.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
