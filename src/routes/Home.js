import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await db.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setTweet(value);
  };

  const getTweets = async () => {
    const dbTweets = await db.collection("tweets").get();
    dbTweets.forEach((document) => {
      const newObject = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [newObject, ...prev]);
    });
  };

  useEffect(() => {
    getTweets();
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
      {tweets.map((data) => (
        <div>
          <h4 key={data.id}>{data.tweet}</h4>
        </div>
      ))}
    </>
  );
};

export default Home;
