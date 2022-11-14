import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";

function TextArea() {
  const [socket, setSocket] = useState();
  const [value, setValue] = useState("");
  const user = { isAdmin: false };
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL);
    setSocket(newSocket);
    newSocket.on("message", (data) => {
      setValue(data);
    });
  }, []);
  return (
    <textarea
      disabled={user.isAdmin}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        socket.send(newValue);
        setValue(newValue);
      }}
    />
  );
}

export default TextArea;
