import React,  { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.less'

const App = () => {
  const [num, setNum] = useState(0)
  useEffect(() => {
    document.title = 'HAHA' + num
  }, [num])
  return <div>
    app
    <button onClick={() => setNum(num + 1)}>{num}</button> 
  </div> 
}

class Bpp extends React.Component {
  render() {
    return <div>
      Bpp
      <App />
    </div>
  }
}

ReactDOM.render(
  <Bpp />,
  document.getElementById('root')
)