import React, { useCallback, useRef, useState } from "react";
import { useReplicant } from "../../hooks";
import { TextField, Button, Grid, List, ListItem, ListItemText, ListItemButton, IconButton } from "@mui/material";

const App: React.FC = () => {
	const [ad, setAd] = useReplicant("ad");
    const [value, setValue] = useState("");
    const [update, setUpdate] = useState(0);

	if (typeof ad === "undefined") return null;

    const addAds = () => {
        if (value !== "") {
            const temp = ad
            temp.push(value)
            setAd(temp)
            setValue("")
            setTimeout(() => {
                setUpdate(Math.floor(Math.random() * 1000))
            }, 200);
        }
    }

    const deleteItem = (index: number) => {
        const temp = ad
        temp.splice(index, 1)
        setAd(temp)
        setTimeout(() => {
            setUpdate(Math.floor(Math.random() * 1000))
        }, 300);
    }

	return (
        <div>
            <p style={{ display: "none" }}>{update}</p>
            <Grid container direction="column" alignItems="stretch" spacing={2}>
                {ad.map((item, index) => {
                    return (
                        <Grid item key={index}>
                        <TextField
                            id="outlined-read-only-input"
                            label={`広告${index + 1}`}
                            defaultValue={item}
                            sx={{ width: "100%" }}
                            InputProps={{
                                readOnly: true,
                                endAdornment: 
                                <IconButton edge="end" aria-label="delete" onClick={() => {deleteItem(index)}}>
                                    <span className="material-icons">delete</span>
                                </IconButton>
                            }}
                        /> 
                        </Grid>
                    )
                })}
                <Grid item>
                    <TextField
                        id="outlined-basic"
                        label="テキスト"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={addAds}>
                        追加
                    </Button>
                </Grid>
            </Grid>
        </div>
	);
};

export default App;
