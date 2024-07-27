import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useSocket } from "@/context/SocketProvider";
import { useState } from "react";

export default function Home() {
	const { sendMessage } = useSocket();
	const [message, setMessage] = useState("");

	const handleSendMessage = (e) => {
		sendMessage(message);
		setMessage("");
	};

	return (
		<div>
			<div>
				<h1>All msgs</h1>
			</div>
			<div>
				<Input onChange={(e) => setMessage(e.target.value)} value={message}/>
				<Button onClick={handleSendMessage}>Send</Button>
			</div>
		</div>
	);
}
