import React, { useState } from "react";
import { db } from "../firebase";

const Home = () => {
  const [tweet, setTweet] = useState("");
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

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="start typing...."
        value={tweet}
        onChange={onChange}
      />
      <input type="submit" value="tweet" />
    </form>
  );
};

export default Home;
