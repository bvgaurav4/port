import { useEffect, useRef, useState } from 'react'

import './App.css'

function Base() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Autoplay was prevented:', error)
      })
    }
  }, [])
  return (
<div>
    <img src="src/assets/Daft_Punk_-_Random_Access_Memories.jpg" style={{ borderRadius: '50%' }} className='logo react'></img>
    {/* <audio    ref={audioRef} loop>
        <source src="src/assets/Doin it Right (Official Audio).mp3" type="audio/mpeg" />
    </audio> */}
</div>

  )
}
export default Base
