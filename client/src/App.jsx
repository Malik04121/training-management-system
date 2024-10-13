import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AllRoute } from './routes/mainRoute'
import Header from './components/Headers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
     <AllRoute/>
    </>
  )
}

export default App
