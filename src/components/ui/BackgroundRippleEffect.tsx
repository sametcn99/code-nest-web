'use client'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

export const BackgroundCellCore = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full overflow-hidden">
      <div className="absolute inset-y-0 h-[50rem] overflow-hidden">
        <div className="pointer-events-none absolute -bottom-2 z-40 h-full w-full bg-zinc-950 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            WebkitMaskImage: `radial-gradient(
          white, transparent
        )`,
            pointerEvents: 'none',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          <Pattern cellClassName="border-blue-950 relative z-[100]" />
        </div>
        <Pattern
          className="opacity-[0.5]"
          cellClassName={'border-neutral-900'}
        />
      </div>
    </div>
  )
}

const Pattern = ({
  className,
  cellClassName,
}: {
  className?: string
  cellClassName?: string
}) => {
  const x = new Array(47).fill(0)
  const y = new Array(30).fill(0)
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]))

  return (
    <div className={cn('relative z-30 flex flex-row', className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="relative z-20 flex flex-col border-b"
        >
          {row.map((_, colIdx) => {
            // Removed the unused 'column' variable and replaced it with '_'
            return (
              <div
                key={`matrix-col-${colIdx}`}
                className={cn(
                  'border-b border-l border-neutral-600 bg-transparent',
                  cellClassName
                )}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: 'backOut',
                  }}
                  className="h-12 w-12 bg-[rgba(14,165,233,0.3)]" //  rgba(14, 165, 233, 0.15) for a more subtle effect
                ></motion.div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
