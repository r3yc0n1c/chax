"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface SocketProviderProps {
	children?: React.ReactNode;
}

interface IOSocketContext {
	sendMessage: (message: string) => any;
	messages: string[];
}

const SocketContext = React.createContext<IOSocketContext | null>(null);

export const useSocket = () => {
	const state = useContext(SocketContext);
	if (!state) throw new Error("socket state is undefined");

	return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<string[]>([]);

	const sendMessage: IOSocketContext["sendMessage"] = useCallback(
		(message: string) => {
			console.log("msg sent", message);
            if(socket)
                socket.emit("message", message);
		},
		[socket],
	);

	const onMessageReceived = useCallback((msg: string) => {
		console.log("From Server Msg Rec", msg);
		const { message } = JSON.parse(msg) as { message: string };
		setMessages((prev) => [...prev, message]);
	}, []);

	useEffect(() => {
		const _socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

		setSocket(_socket);

		return () => {
			_socket.off("message", onMessageReceived);
			_socket.disconnect();
			setSocket(undefined);
		};
	}, []);

	return (
		<SocketContext.Provider value={{ sendMessage, messages }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
