import type { CSSProperties } from 'react'

const DEFAULT_CONTROLS = ['.'
]

type ControlsPanelProps = {
    placement: CSSProperties
    clipPath: string
    width: CSSProperties['width']
    height: CSSProperties['height']
    title?: string
    controls?: string[]
}

const panelStyle: CSSProperties = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 10, 5, 0.85)',
    padding: '10px 24px',
    color: '#00ff88',
    fontFamily: 'monospace',
    borderLeft: '2px solid #00ff88',
    borderBottom: '2px solid #00ff88',
    borderRight: '2px solid #00ff88',
    borderTop: '2px solid #00ff88',
}

const headingStyle: CSSProperties = {
    margin: '0 0 15px',
    letterSpacing: '3px',
    borderBottom: '1px solid #00ff8855',
    paddingBottom: '10px',
}

export default function HorizontalEdgePanel({
    placement,
    clipPath,
    width,
    height,
    title = 'CONTROLS',
    controls = DEFAULT_CONTROLS,
}: ControlsPanelProps) {
    return (
        <div style={{ ...panelStyle, ...placement, width, height, clipPath }}>
            <h3 style={headingStyle}>{title}</h3>
            {controls.map((control) => (
                <p key={control}>{control}</p>
            ))}
        </div>
    )
}
