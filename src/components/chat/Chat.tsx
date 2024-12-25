import React from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  return (
    <div className="chat">
      <ChatHeader />
      <div className="chatMessage">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input type="text" placeholder="send a message" />
          <button type="submit" className="chatInputbutton">
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
