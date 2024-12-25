import React from "react";
import "./ChatMessage.scss";
import { Avatar } from "@mui/material";

const ChatMessage = () => {
  return (
    <div className="message">
      <Avatar />
      <div className="messageInfo">
        <h4>
          daimaru
          <span className="messageTimestamp">2024/12/25</span>
        </h4>
        <p>This is a message</p>
      </div>
    </div>
  );
};

export default ChatMessage;
