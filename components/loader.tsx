"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative">
        <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
            className="dark:stroke-gray-700"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f97316"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{
              pathLength: 1,
              rotate: 360,
              transition: {
                pathLength: { duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
                rotate: { duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY },
              },
            }}
            className="absolute top-0 left-0"
            style={{ originX: "50%", originY: "50%" }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-orange-500 font-bold">DE</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

