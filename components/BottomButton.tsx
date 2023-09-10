import { Button } from "@nextui-org/react"
import s from './BottomButton.module.scss';
import cn from 'clsx';
 const BottomButton = ({children,onClick}:{
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div className={cn(s.wrapper,s.notindrawer)} >
      <Button size="lg" fullWidth color="primary" radius="lg" onClick={onClick}>
        {children}
      </Button>
    </div>
  )
}

export default BottomButton