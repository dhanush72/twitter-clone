import React, { useState } from "react";
import { db, storage } from "../firebase";

const Tweet = ({ newTweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [isEdit, setIsEdit] = useState(newTweet.tweet);

  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");

    if (ok) {
      await db.doc(`tweets/${newTweet.id}`).delete();
      // delete an image
      await storage.refFromURL(newTweet.attachmentURL).delete();
    }
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await db.doc(`tweets/${newTweet.id}`).update({
      tweet: isEdit,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setIsEdit(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={isEdit} required onChange={onChange} />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}> cancel </button>
        </>
      ) : (
        <>
          <h4> {newTweet.tweet} </h4>
          {newTweet.attachmentURL && (
            <img
              src={newTweet.attachmentURL}
              alt=""
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
