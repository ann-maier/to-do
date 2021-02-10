import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      const _socket = socketIOClient("localhost:8000");
      setSocket(_socket);
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return socket;
};
