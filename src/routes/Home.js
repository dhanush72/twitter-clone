import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    const { value } = e.target.value;
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
