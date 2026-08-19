import { useState } from 'react'
import PasswordScreen from './components/PasswordScreen'
import LoveNote from './components/LoveNote'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <PasswordScreen onUnlock={() => setUnlocked(true)} />
  }

  return <LoveNote />
}
