import React,  { useEffect, useState } from 'react'
import { Button } from 'antd'

const App = () => {
  const [num, setNum] = useState(0)
  useEffect(() => {
    document.title = "Home"
  }, [num])
  return <div>
    Home page
    <Button onClick={() => setNum(num + 1)}>{num}</Button> 
  </div> 
}

export default App