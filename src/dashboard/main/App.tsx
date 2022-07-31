import React, { useCallback, useRef } from "react";
import { useReplicant } from "../../hooks";
import { TextField, Button, Grid } from "@mui/material";

const App: React.FC = () => {
	const titleRef = useRef<any>();
	const presentorRef = useRef<any>();
	const programRef = useRef<any>();
	const [main, setMain] = useReplicant("main");

	const applyAll = useCallback(() => {
		setMain({
			title: titleRef.current?.children[1].children[0].value ?? "",
			presentor:
				presentorRef.current?.children[1].children[0].value ?? "",
			program: programRef.current?.children[1].children[0].value ?? "",
		});
	}, []);

	if (typeof main === "undefined") return null;

	return (
		<Grid container direction="column" alignItems="stretch" spacing={2}>
			<Grid item>
				<TextField
					id="outlined-basic"
					label="タイトル"
					variant="outlined"
					sx={{ width: "100%" }}
					ref={titleRef}
					defaultValue={main?.title}
				/>
			</Grid>
			<Grid item>
				<TextField
					id="outlined-basic"
					label="プレゼンター"
					variant="outlined"
					sx={{ width: "100%" }}
					ref={presentorRef}
					defaultValue={main?.presentor}
				/>
			</Grid>
			<Grid item>
				<TextField
					id="outlined-basic"
					label="プログラム"
					variant="outlined"
					sx={{ width: "100%" }}
					ref={programRef}
					defaultValue={main?.program}
				/>
			</Grid>
			<Grid item>
				<Button variant="contained" onClick={applyAll}>
					全て更新
				</Button>
			</Grid>
		</Grid>
	);
};

export default App;
