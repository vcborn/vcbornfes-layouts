import React, { useEffect, useState } from "react";
import { useReplicant } from "../../hooks";

export const App: React.FC = () => {
	const [next] = useReplicant("next");

	if (typeof next === "undefined") return null;

	return (
		<div className="relative bg-black h-screen w-full">
            <div className="absolute right-0 bg-white max-w-[40rem] w-full h-full font-['futura-pt'] pl-20 flex flex-col justify-center gap-4">
                <img src="./vcborn-simple-icon.jpg" className="rounded-full w-64 h-64 mb-4" />
                <p className="text-[5rem] font-bold"><i>Up Next</i>&nbsp;&nbsp;&gt;&gt;</p>
                <table className="text-stone-600 text-5xl font-semibold">
                    {next.map((item, index) => {
                        return (
                            <tr>
                                <td className="w-44">{item.time}~</td>
                                <td>{item.event}</td>
                            </tr>
                        )
                    })}
                    
                </table>
            </div>
			<video id="video" src="./upnext.mp4" webkit-playsinline muted autoPlay loop></video>
		</div>
	);
};
