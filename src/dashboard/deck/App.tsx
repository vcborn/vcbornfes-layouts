import React, { useState } from 'react'
import { useReplicant } from '../../hooks'
import { Button, Grid } from '@mui/material'

const App: React.FC = () => {
  const [deck, setDeck] = useReplicant('deck')

  if (typeof deck === 'undefined') return null

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setDeck('drumroll')}
          >
            ドラムロール
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setDeck('symbal')}
          >
            ドラムロール閉め
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setDeck('explosion')}
          >
            爆発
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => setDeck('quiz')}>
            出題
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setDeck('trumpet')}
          >
            トランペット
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth variant="contained" onClick={() => setDeck('')}>
            停止
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
