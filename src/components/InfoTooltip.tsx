import { ReactNode } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import Information from '../assets/information.svg?react'

type Props = {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
}

const InfoTooltip = ({ children, onOpenChange }: Props) => {
  return (
    <Tooltip onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>
        <Information className="size-4 invert"></Information>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{children}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default InfoTooltip
