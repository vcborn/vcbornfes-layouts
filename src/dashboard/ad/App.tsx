import React, { useCallback, useRef, useState } from 'react'
import { useReplicant } from '../../hooks'
import {
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
} from '@mui/material'

const App: React.FC = () => {
  const [ad, setAd] = useReplicant('ad')
  const [update, setUpdate] = useState(0)

  if (typeof ad === 'undefined') return null

  const addAds = () => {
    const temp = ad
    temp.push('')
    setAd(temp)
    setTimeout(() => {
      setUpdate(Math.floor(Math.random() * 1000))
    }, 200)
  }

  const deleteItem = (index: number) => {
    const temp = ad
    console.log(ad)
    temp.splice(index, 1)
    console.log(temp)
    setAd(temp)
    setTimeout(() => {
      setUpdate(Math.floor(Math.random() * 1000))
    }, 300)
  }

  const updateItem = (index: number, text: string) => {
    const temp = ad
    temp[index] = text
    setAd(temp)
  }

  return (
    <div>
      <p style={{ display: 'none' }}>{update}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ad.map((item, index) => {
          return (
            <div key={item}>
              <TextField
                id="outlined-read-only-input"
                label={`広告${index + 1}`}
                defaultValue={item}
                sx={{ width: '100%' }}
                onChange={(e) => updateItem(index, e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        deleteItem(index)
                      }}
                    >
                      <span className="material-icons">delete</span>
                    </IconButton>
                  ),
                }}
              />
            </div>
          )
        })}
        <div>
          <Button variant="contained" onClick={addAds}>
            追加
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
