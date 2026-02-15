import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'

const ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  color: `hsl(${i * 30}, 60%, 55%)`,
  label: `Item ${i + 1}`,
}))

export default function Grid() {
  const p = useDialKit('Grid', {
    gap: [16, 0, 48],
    padding: [24, 0, 64],
    columns: [3, 1, 6],
    card: {
      borderRadius: [12, 0, 32],
    },
  })

  const cols = Math.round(p.columns)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: p.gap,
        padding: p.padding,
        minHeight: '100%',
        background: '#1a1a2e',
        boxSizing: 'border-box',
      }}
    >
      {ITEMS.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.04, y: -4 }}
          transition={{ type: 'spring', visualDuration: 0.25, bounce: 0.3 }}
          style={{
            background: item.color,
            borderRadius: p.card.borderRadius,
            aspectRatio: '4 / 3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 600,
            color: '#fff',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {item.label}
        </motion.div>
      ))}
    </div>
  )
}
