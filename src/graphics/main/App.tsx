import React, { useEffect, useState } from "react";
import { useReplicant } from "../../hooks";

export const App: React.FC = () => {
	const [main] = useReplicant("main");
	const [chat] = useReplicant("chat");
	const [data, setData] = useState(0);
	const [refreshInterval, setRefreshInterval] = useState(1000);
	const fetchMetrics = () => {
		console.log(data)
		setData(Math.floor(Math.random() * 1001))
	}
	useEffect(() => {
		if (refreshInterval && refreshInterval > 0) {
			const interval = setInterval(fetchMetrics, refreshInterval);
			return () => clearInterval(interval);
		}
	}, [refreshInterval]);

	if (typeof main === "undefined" || typeof chat === "undefined") return null;

	return (
		<div className="relative bg-primary h-screen w-full">
			<p className="hidden">{data}</p>
			<div className="absolute right-0 px-8 py-8 flex flex-col gap-4 max-w-[19rem] max-h-[80vh] overflow-clip">
				{chat.map((item, index) => {
					if (item.text === "") return null;
					return (
						<div
							className="flex flex-col bg-white px-4 py-5"
							key={index}
						>
							<p className="text-xl font-bold">{item.text}</p>
							<hr className="border border-gray-800 my-2" />
							<div className="flex flex-row items-center justify-between">
								<div className="flex gap-2 items-center">
									<img
										src={item.user.profileImageUrl}
										className="w-6 h-6 rounded-full"
									/>
									<p className="pb-1">
										{item.user.screenName}
									</p>
								</div>
								{item.service === "youtube" && (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="#ff0000"
										viewBox="0 0 16 16"
									>
										<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
									</svg>
								)}
								{item.service === "twitter" && (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="28"
										height="28"
										fill="#1da1f2"
										viewBox="0 0 24 24"
									>
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
									</svg>
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div className="absolute bottom-0 w-full flex flex-col gap-4 text-white py-8 px-12">
				<h1 className="font-bold text-4xl">{main.title}</h1>
				<hr className="border-2" />
				<div className="flex flex-row justify-between">
					<p className="font-bold text-2xl">{main.presentor}</p>
					<p className="font-bold text-2xl">Now: {main.program}</p>
				</div>
			</div>
		</div>
	);
};
