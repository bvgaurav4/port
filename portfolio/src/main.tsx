import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Lays from './lays.tsx'
import Test from './test.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <div>
      {/* <Test></Test> */}
    <Lays></Lays> 
    </div>
  </StrictMode>,
)
