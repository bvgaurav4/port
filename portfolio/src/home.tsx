import { useRef } from 'react'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './index.css'
import ControlsPanel from './ControlsPanel'
import EdgePanel from './edgePannel'
import HorizontalEdgePanel from './HorizontalEdges'

// import * as CANNON from 'cannon-es'
// import Stats from 'three/addons/libs/stats.module.js'

type ClipUnit = 'px' | '%'
type ClipPoint = readonly [number, number]

const toPolygon = (points: readonly ClipPoint[], unit: ClipUnit = '%') =>
    `polygon(${points.map(([x, y]) => `${x}${unit} ${y}${unit}`).join(', ')})`

type CornerCuts = {
    topLeft?: number
    topRight?: number
    bottomRight?: number
    bottomLeft?: number
}

const chamferedRect = (
    { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 }: CornerCuts = {},
    unit: ClipUnit = '%',
) => {
    const points: ClipPoint[] = [[topLeft, 0]]
    points.push(topRight ? [100 - topRight, 0] : [100, 0])
    if (topRight) points.push([100, topRight])
    points.push(bottomRight ? [100, 100 - bottomRight] : [100, 100])
    if (bottomRight) points.push([100 - bottomRight, 100])
    points.push(bottomLeft ? [bottomLeft, 100] : [0, 100])
    if (bottomLeft) points.push([0, 100 - bottomLeft])
    if (topLeft) points.push([0, topLeft])
    return toPolygon(points, unit)
}

const CUT = 100
const PANEL_WIDTH = 1200
const LEAD = (150 / PANEL_WIDTH) * 100
const SLANT_LEFT = 14
const SLANT_RIGHT = 87

const PANEL_SIZE = {
    controls: { width: '450px', height: '300px' },
    edge: { width: '150px', height: '530px' },
    horizontal: { width: `${PANEL_WIDTH}px`, height: '85px' },
}

const clips = {
    controlsBottomLeft: chamferedRect({ topRight: CUT }),
    edgeLeft: chamferedRect(),
    edgeRight: chamferedRect(),
    horizontalBottomRight: toPolygon([
        [0, 0], [0, 0], [100, 0], [SLANT_RIGHT, 100], [100, 100], [SLANT_LEFT, 100],
    ]),
    horizontalTopRight: toPolygon([
        [LEAD, 0], [0, 0], [SLANT_RIGHT, 0], [100, 100], [100, 100], [0, 100],
    ]),
    controlsBottomRight: toPolygon([
        [0, 0], [0, 0], [0, 100], [100, 100], [100, 0], [0, 100],
    ]),
    controlsTopRight: chamferedRect({ bottomLeft: CUT }),
    controlsTopLeft: chamferedRect({ bottomRight: CUT }),
}

export default function Home(){

    const mountRef = useRef<HTMLDivElement>(null)

    return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ bottom: 5, left: 5 }}
          clipPath={clips.controlsBottomLeft}
        />


        <EdgePanel
          {...PANEL_SIZE.edge}
          placement={{ bottom: 200, left: 5 }}
          clipPath={clips.edgeLeft}
        />


        <EdgePanel
          {...PANEL_SIZE.edge}
          placement={{ bottom: 200, right: 5 }}
          clipPath={clips.edgeRight}
        />



        <HorizontalEdgePanel
          {...PANEL_SIZE.horizontal}
          placement={{ bottom: 5, right: 335 }}
          clipPath={clips.horizontalBottomRight}
        />

        <HorizontalEdgePanel
          {...PANEL_SIZE.horizontal}
          title='Play'
          placement={{ top: 5, right: 335 }}
          clipPath={clips.horizontalTopRight}
        />

        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ bottom: 5, right: 5 }}
          clipPath={clips.controlsBottomRight}
        />

        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ top: 5, right: 5 }}
          clipPath={clips.controlsTopRight}
        />

        <ControlsPanel
          {...PANEL_SIZE.controls}
          placement={{ top: 5, left: 5 }}
          clipPath={clips.controlsTopLeft}
        />
    </div>
  );
}