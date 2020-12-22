import React, { useState } from "react";
import { db, storage } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ newTweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [isEdit, setIsEdit] = useState(newTweet.tweet);

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

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await db.doc(`tweets/${newTweet.id}`).delete();
      await storage.refFromURL(newTweet.attachmentUrl).delete();
    }
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              value={isEdit}
              onChange={onChange}
              className="formInput"
              required
              autoFocus
            />
            <input type="submit" value="Update" className="formBtn" />
          </form>

          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <div style={{ paddingBottom: ".5rem" }}>
            <h4> {newTweet.tweet} </h4>
            {newTweet.attachmentURL && (
              <img src={newTweet.attachmentURL} alt="" />
            )}
          </div>
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
