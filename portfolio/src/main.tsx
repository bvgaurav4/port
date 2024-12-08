import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Base from './Base.tsx'
import Lays from './lays.tsx'
import { Sphere } from 'three'
import Lays2 from './test.tsx'

import { Stack, Button } from '@mantine/core';
createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <div>


    {/* <Lays2></Lays2> */}
    <Lays></Lays> 
    {/* <Base></Base> */}
    </div>
  </StrictMode>,
)
