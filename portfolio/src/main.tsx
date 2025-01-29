import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lays from './lays.tsx'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <div>
    <Lays></Lays> 
    {/* <body>

    <h1 >hello my name is </h1>
    </body> */}
    </div>
  </StrictMode>,
)
