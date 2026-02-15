import { Children, cloneElement, isValidElement } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDialKit } from 'dialkit'

export default function PageTransition({ pageKey, children }) {
  const p = useDialKit('Transition', {
    exit: {
      duration: [0.2, 0.05, 0.6],
      fadeY: [0, -30, 30],
    },
    enter: {
      duration: [0.35, 0.1, 0.8],
      slideY: [24, 0, 80],
      delayChildren: [0.1, 0, 0.5],
      staggerChildren: [0.06, 0, 0.2],
    },
  })

  const containerVariants = {
    initial: {
      opacity: 0,
      y: p.enter.slideY,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: p.enter.duration,
        ease: [0.25, 0.1, 0.25, 1],
        when: 'beforeChildren',
        delayChildren: p.enter.delayChildren,
        staggerChildren: p.enter.staggerChildren,
      },
    },
    exit: {
      opacity: 0,
      y: p.exit.fadeY,
      transition: {
        duration: p.exit.duration,
        ease: [0.4, 0, 1, 1],
      },
    },
  }

  const childVariants = {
    initial: { opacity: 0, y: p.enter.slideY * 0.6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: p.enter.duration * 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const wrappedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child
    return (
      <motion.div variants={childVariants} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {child}
      </motion.div>
    )
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {wrappedChildren}
      </motion.div>
    </AnimatePresence>
  )
}
