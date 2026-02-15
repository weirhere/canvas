import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'

const CARD_COUNT = 7

const COLORS = [
  'hsl(0, 60%, 55%)',
  'hsl(210, 60%, 55%)',
  'hsl(150, 50%, 50%)',
  'hsl(40, 65%, 55%)',
  'hsl(270, 50%, 55%)',
  'hsl(175, 50%, 48%)',
  'hsl(25, 65%, 55%)',
]

function seededRandom(seed) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function Card({ color, rotation, x, y, zIndex, params }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale: hovered ? params.hoverScale : 1,
        y: hovered ? y - 20 : y,
        x,
        rotate: rotation,
      }}
      transition={params.spring}
      style={{
        position: 'absolute',
        width: 200,
        height: 280,
        borderRadius: 12,
        border: '2px solid rgba(255,255,255,0.15)',
        backgroundColor: color,
        boxShadow: hovered
          ? `0 20px ${params.shadowBlur * 1.5}px rgba(0,0,0,${params.shadowOpacity * 1.3})`
          : `0 ${4 + zIndex * 2}px ${params.shadowBlur}px rgba(0,0,0,${params.shadowOpacity})`,
        zIndex: hovered ? 100 : zIndex,
        cursor: 'pointer',
      }}
    />
  )
}

export default function ScatteredCards() {
  const params = useDialKit('Cards', {
    spring: { type: 'spring', visualDuration: 0.4, bounce: 0.2 },
    hoverScale: [1.08, 1, 1.5],
    rotation: [25, 0, 90],
    offset: [8, 0, 40],
    shadowBlur: [24, 0, 80],
    shadowOpacity: [0.3, 0, 1],
  })

  const seeds = useMemo(
    () =>
      Array.from({ length: CARD_COUNT }, (_, i) => ({
        rotDir: seededRandom(i * 3 + 1) > 0.5 ? 1 : -1,
        rotAmount: seededRandom(i * 3 + 2),
        xShift: (seededRandom(i * 3 + 3) - 0.5) * 2,
      })),
    [],
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#1a1a2e',
        overflow: 'hidden',
        padding: 60,
      }}
    >
      <div style={{ position: 'relative', width: 200, height: 280, overflow: 'visible' }}>
        {seeds.map((seed, i) => (
          <Card
            key={i}
            color={COLORS[i]}
            rotation={seed.rotDir * seed.rotAmount * params.rotation}
            x={seed.xShift * 20}
            y={-i * params.offset}
            zIndex={i}
            params={params}
          />
        ))}
      </div>
    </div>
  )
}
