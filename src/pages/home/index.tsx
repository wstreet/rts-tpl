import React,  { useEffect, useState } from 'react'
import { Button, Skeleton  } from 'antd'
import Toolbar from 'components/toolbar'

const Item = Toolbar.Item

const App = () => {
  const [num, setNum] = useState(0)
  useEffect(() => {
    document.title = "Home"
  }, [num])
  const onClick = (value: any) => {
    console.log(value)
  }
  return <div>
    <Toolbar prefixCls="a" onClick={onClick}>
      <Item name="aa">
        <Skeleton  />
        <Button onClick={() => setNum(num + 1)}>{num}</Button> 
      </Item>
    </Toolbar>
    
  </div> 
}

export default App