const ErrorFallbackComponent = () => {
  return (
    <main className="mx-auto max-w-[520px]  ">
      <div className="flex  h-screen flex-col items-center justify-center pl-6 pr-6 items-center text-center">
        일시적인 문제가 발생했습니다.
        <br/>잠시 후 다시 시도해주세요.
      </div>
    </main>
  )
}

export default ErrorFallbackComponent