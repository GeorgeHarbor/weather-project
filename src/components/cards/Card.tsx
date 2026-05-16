import clsx from 'clsx'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title?: string
  childrenClassName?: string
  className?: string
}

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: Props) {
  return (
    <div
      className={clsx(
        'p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4',
        className
      )}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <div
        className={clsx(
          childrenClassName,
          'animate-[fade-in_1s_ease-out_forwards]'
        )}
      >
        {children}
      </div>
    </div>
  )
}
