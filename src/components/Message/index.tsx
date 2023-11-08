import React from "react";

interface MessageProps {
  message: string;
  isSuccess: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isSuccess }) => {
  return <div className={isSuccess ? "success-message" : "error-message"}>{message}</div>;
};

export default Message;
