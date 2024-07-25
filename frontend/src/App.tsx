import { useState } from "react";
import Home from "@/components/Home";

function App() {
	const [count, setCount] = useState(0);

	return (
		<main>
			<Home />
		</main>
	);
}

export default App;
