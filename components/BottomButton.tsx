import { Button } from "@nextui-org/react"

 const BottomButton = ({children,onClick}:{
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex gap-x-4 pt-8 pb-5 max-w-[520px] pr-5 pl-5">
      <Button size="lg" fullWidth color="primary" radius="lg" onClick={onClick}>
        {children}
      </Button>
    </div>
  )
}

export default BottomButton