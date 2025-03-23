"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, FileText } from "lucide-react"

export default function HeroAnimation() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[400px] w-full max-w-[500px]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl" />

      {/* Document container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative bg-background rounded-lg shadow-lg w-[280px] h-[350px] border overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Document header */}
          <div className="bg-muted p-3 border-b">
            <div className="h-4 w-32 bg-primary/20 rounded-full" />
          </div>

          {/* Document content */}
          <div className="p-4 space-y-3">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 rounded-full ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/6"} ${step >= 2 ? "bg-muted" : "bg-primary/20"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>

          {/* Processing overlay */}
          {step === 1 && (
            <motion.div
              className="absolute inset-0 bg-primary/10 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </motion.div>
          )}

          {/* Simplified document */}
          {step >= 2 && (
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="bg-primary p-3 border-b flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-foreground" />
                <div className="h-4 w-32 bg-primary-foreground/20 rounded-full" />
              </div>

              <div className="p-4 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className={`h-2 rounded-full bg-primary/20 ${i % 2 === 0 ? "w-1/4" : "w-1/6"}`} />
                    <div className={`h-2 rounded-full bg-muted ${i % 2 === 0 ? "w-full" : "w-5/6"}`} />
                    {i % 2 === 0 && <div className="h-2 rounded-full bg-muted w-4/6" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-[15%] right-[5%] bg-background p-2 rounded-lg shadow-lg border"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "easeInOut",
        }}
      >
        <FileText className="h-8 w-8 text-primary" />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[10%] bg-background p-2 rounded-lg shadow-lg border"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 4,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="space-y-1">
          <div className="h-1 w-8 bg-primary/30 rounded-full" />
          <div className="h-1 w-6 bg-primary/30 rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
