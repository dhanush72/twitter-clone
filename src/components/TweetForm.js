import React, { useState } from "react";
import { storage, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetForm = ({ user }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (e) => {
    if (tweet === "") {
      alert("field cannot be empty");
      return;
    }
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
    setAttachment("");
  };
  return (
    <>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            type="text"
            placeholder="start typing...."
            value={tweet}
            onChange={onChange}
            className="factoryInput__input"
          />

          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>

        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />

        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              alt=""
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default TweetForm;
