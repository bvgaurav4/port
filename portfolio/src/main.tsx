import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lays from './lays.tsx'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <div>
      {/* <Test></Test> */}
    <Lays></Lays> 
    </div>
  </StrictMode>,
)
