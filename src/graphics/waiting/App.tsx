import React, { useEffect, useState } from 'react'
import { useReplicant } from '../../hooks'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export const App: React.FC = () => {
  const [next] = useReplicant('next')
  const [ad] = useReplicant('ad')
  const [data, setData] = useState(0)
  const [refreshInterval, setRefreshInterval] = useState(1000)
  const fetchMetrics = () => {
    setData(Math.floor(Math.random() * 1001))
  }
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchMetrics, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [refreshInterval])

  if (typeof next === 'undefined' || typeof ad === 'undefined') return null

  return (
    <div className="relative bg-black h-screen w-full overflow-hidden">
      <p className="hidden">{data}</p>
      <div className="absolute right-0 bg-white max-w-[40rem] w-full h-full pl-20 flex flex-col justify-center gap-4 z-10">
        <img
          src="./vcborn-simple-icon.png"
          className="rounded-full w-64 h-64 mb-4"
        />
        <p className="text-[5rem] font-bold font-['futura-pt']">
          <i>Up Next</i>&nbsp;&nbsp;&gt;&gt;
        </p>
        <table className="text-stone-600 text-5xl font-semibold mb-12">
          {next.slice(0, 3).map((item) => {
            return (
              <tr>
                <td className="w-44 font-['futura-pt']">{item.time}~</td>
                <td className="pb-2">{item.event}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <div className="absolute bottom-0 w-full bg-primary text-white h-16 flex flex-row items-center z-10">
        <svg
          className="mx-8 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M4.574 16.989c-1.768.647-3.719-.275-4.365-2.06-.647-1.785.262-3.757 2.027-4.404l3.242-1.187 2.338 6.464-3.242 1.187zm6.282 3.172c-.437-.151-.814-.43-1.089-.8l-1.635-2.202-3.301 1.209 2.602 3.353c.292.376.79.52 1.237.356l2.216-.81c.229-.084.382-.307.381-.553-.002-.246-.156-.464-.389-.545l-.022-.008zm-4.09-11.294l2.338 6.464c2.155-.417 5.077-.401 8.896.401l-4.675-12.927c-2.476 3.165-4.663 5.004-6.559 6.062zm10.795-3.102c.856.411 1.556 1.149 1.893 2.117.339.967.254 1.98-.157 2.836l1.407.678c.585-1.216.708-2.656.227-4.03-.481-1.375-1.474-2.424-2.689-3.009l-.681 1.408zm1.188-2.465c1.486.715 2.698 1.998 3.286 3.678s.438 3.441-.277 4.927l1.443.696c.893-1.857 1.079-4.055.346-6.153-.735-2.097-2.247-3.698-4.102-4.591l-.696 1.443z" />
        </svg>
        <Splide
          className="max-w-[112rem] text-3xl"
          options={{
            speed: 500,
            type: 'loop',
            autoplay: true,
            interval: 20000,
            pagination: false,
            arrows: false,
            drag: true,
          }}
        >
          {ad.map((item) => {
            return <SplideSlide>{item}</SplideSlide>
          })}
        </Splide>
      </div>
      <video
        className="absolute z-0"
        id="video"
        src="./upnext.mp4"
        webkit-playsinline
        muted
        autoPlay
        loop
      ></video>
    </div>
  )
}
