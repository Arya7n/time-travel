import { motion } from 'framer-motion'

export function TransitionOverlay({ show }: { show: boolean }) {
  return (
    <motion.div
      className="fx"
      style={{ zIndex: 18, background: '#050506' }}
      initial={false}
      animate={{ opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' }}
      transition={{ duration: 0.7 }}
    />
  )
}
