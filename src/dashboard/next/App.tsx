import React, { useCallback, useRef, useState } from 'react'
import { useReplicant } from '../../hooks'
import { TextField, Button, Grid, IconButton } from '@mui/material'

const App: React.FC = () => {
  const [next, setNext] = useReplicant('next')
  const [update, setUpdate] = useState(0)

  if (typeof next === 'undefined') return null

  const addNext = () => {
    const temp = next
    temp.push({ time: '', event: '' })
    setNext(temp)
    setTimeout(() => {
      setUpdate(Math.floor(Math.random() * 1000))
    }, 200)
  }

  const deleteItem = (index: number) => {
    const temp = next
    temp.splice(index, 1)
    setNext(temp)
    setTimeout(() => {
      setUpdate(Math.floor(Math.random() * 1000))
    }, 300)
  }

  const updateTime = (index: number, time: string) => {
    const temp = next
    temp[index].time = time
    setNext(temp)
  }

  const updateEvent = (index: number, event: string) => {
    const temp = next
    temp[index].event = event
    setNext(temp)
  }

  return (
    <div>
      <p style={{ display: 'none' }}>{update}</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {next.map((item, index) => {
          return (
            <div key={item.time}>
              <TextField
                id="outlined-read-only-input"
                label={`時間${index + 1}`}
                defaultValue={item.time}
                sx={{ mr: 2 }}
                onChange={(e) => updateTime(index, e.target.value)}
              />
              <TextField
                id="outlined-read-only-input"
                label={`イベント${index + 1}`}
                defaultValue={item.event}
                onChange={(e) => updateEvent(index, e.target.value)}
              />
              <IconButton
                sx={{ ml: 1, mt: 1 }}
                aria-label="delete"
                onClick={() => {
                  deleteItem(index)
                }}
              >
                <span className="material-icons">delete</span>
              </IconButton>
            </div>
          )
        })}
        <div>
          <Button variant="contained" onClick={addNext}>
            追加
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
