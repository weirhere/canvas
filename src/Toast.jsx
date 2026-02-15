import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDialKit } from 'dialkit'

let nextId = 0

export default function Toast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(() => {
    const id = nextId++
    setToasts((t) => [...t, { id, message: `Notification #${id + 1}` }])
    setTimeout(() => {
      setToasts((t) => t.filter((item) => item.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((item) => item.id !== id))
  }, [])

  const p = useDialKit('Toast', {
    spring: { type: 'spring', visualDuration: 0.45, bounce: 0.15 },
    offsetY: [20, 0, 100],
    blur: [16, 0, 40],
    bgOpacity: [0.85, 0, 1],
    showClose: true,
    trigger: { type: 'action', label: 'Trigger Toast' },
  }, {
    onAction: (action) => {
      if (action === 'trigger') addToast()
    },
  })

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <AnimatePresence>
          {toasts.map((toast, i) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -60, scale: 0.95, filter: `blur(${p.blur}px)` }}
              animate={{
                opacity: 1,
                y: i * (48 + p.offsetY),
                scale: 1,
                filter: 'blur(0px)',
              }}
              exit={{ opacity: 0, y: -40, scale: 0.9, filter: `blur(${p.blur * 0.5}px)` }}
              transition={p.spring}
              style={{
                ...styles.toast,
                background: `rgba(30, 30, 46, ${p.bgOpacity})`,
                backdropFilter: `blur(${p.blur}px)`,
                WebkitBackdropFilter: `blur(${p.blur}px)`,
              }}
            >
              <span style={styles.message}>{toast.message}</span>
              {p.showClose && (
                <button
                  onClick={() => removeToast(toast.id)}
                  style={styles.closeButton}
                >
                  &times;
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {toasts.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No notifications yet</p>
          <button onClick={addToast} style={styles.triggerButton}>
            Trigger Toast
          </button>
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#1a1a2e',
    overflow: 'hidden',
  },
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 200,
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
  },
  toast: {
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
    pointerEvents: 'auto',
    minWidth: 240,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: '#fff',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 18,
    cursor: 'pointer',
    padding: '0 4px',
    lineHeight: 1,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 16,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
  },
  triggerButton: {
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 500,
    border: 'none',
    borderRadius: 10,
    background: '#fff',
    color: '#111',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
}
