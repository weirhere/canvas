import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDialKit } from 'dialkit'

export default function Modal() {
  const [open, setOpen] = useState(true)
  const [animKey, setAnimKey] = useState(0)

  const params = useDialKit('Modal', {
    spring: { type: 'spring', visualDuration: 0.5, bounce: 0.25 },
    overlayOpacity: [0.6, 0, 1],
    borderRadius: [20, 0, 48],
    replay: { type: 'action', label: 'Replay' },
  }, {
    onAction: (action) => {
      if (action === 'replay') {
        setOpen(false)
        setTimeout(() => {
          setAnimKey((k) => k + 1)
          setOpen(true)
        }, 50)
      }
    },
  })

  const handleClose = useCallback(() => setOpen(false), [])
  const handleOpen = useCallback(() => {
    setAnimKey((k) => k + 1)
    setOpen(true)
  }, [])

  return (
    <div style={styles.wrapper}>
      {!open && (
        <div style={styles.emptyState}>
          <p style={styles.emptyHint}>Modal is closed</p>
          <button onClick={handleOpen} style={styles.openButton}>
            Open Modal
          </button>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key={`overlay-${animKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: params.overlayOpacity }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              style={styles.overlay}
            />

            <motion.div
              key={`modal-${animKey}`}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={params.spring}
              style={{
                ...styles.content,
                borderRadius: params.borderRadius,
              }}
            >
              <h2 style={styles.title}>Spring Modal</h2>
              <p style={styles.body}>
                Tune the entrance animation with the controls panel. Hit replay to see your changes.
              </p>
              <button onClick={handleClose} style={styles.closeButton}>
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
  overlay: {
    position: 'absolute',
    inset: 0,
    background: '#000',
    zIndex: 50,
    cursor: 'pointer',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    maxWidth: '90%',
    padding: '36px 32px 28px',
    background: '#fff',
    zIndex: 51,
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
  },
  title: {
    margin: '0 0 12px',
    fontSize: 22,
    fontWeight: 600,
    color: '#111',
  },
  body: {
    margin: '0 0 24px',
    fontSize: 15,
    lineHeight: 1.5,
    color: '#555',
  },
  closeButton: {
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 500,
    border: 'none',
    borderRadius: 8,
    background: '#111',
    color: '#fff',
    cursor: 'pointer',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 16,
  },
  emptyHint: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
  },
  openButton: {
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
