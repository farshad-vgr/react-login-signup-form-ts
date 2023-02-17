import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
	<Suspense fallback={<h2 className="suspense-fallback">Loading...</h2>}>
		<App />
	</Suspense>,
);
