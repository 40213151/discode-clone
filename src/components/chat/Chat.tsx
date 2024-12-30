import React, { useState } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../App/hooks";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const db = getFirestore();
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    await addDoc(collectionRef, {
      message: inputText,
      timestanp: serverTimestamp(),
      user: user,
    });
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chatMessage">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder="send a message"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
          />
          <button
            type="submit"
            className="chatInputbutton"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => sendMessage(e)}
          >
            send
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
