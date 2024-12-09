import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Lays from './lays.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <div>


    {/* <Lays2></Lays2> */}
    <Lays></Lays> 
    {/* <Base></Base> */}
    </div>
  </StrictMode>,
)
