import React, { useEffect, useState } from "react";
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
  Timestamp,
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);
  const db = getFirestore();

  useEffect(() => {
    let collectionRef = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    let collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc")
    );

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(results);
    });
  }, [channelId]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });

    setInputText("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            value={inputText}
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
