import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lays from './lays.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <div>
      {/* <Test></Test> */}
    <Lays></Lays> 
    </div>
  </StrictMode>,
)
