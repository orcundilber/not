import { useState, useRef, useEffect } from 'react'

const CORRECT_PASSWORD = '351687'

export default function PasswordScreen({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === CORRECT_PASSWORD) {
      onUnlock()
    } else {
      setError('Tekrar dene 💭')
      setShaking(true)
      setValue('')
      setTimeout(() => setShaking(false), 500)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }

  return (
    <div className="password-screen">
      <div className="lock-icon">💌</div>
      <h1>Bu not sana özel 💌</h1>
      <form className="password-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          className={`password-input ${shaking ? 'shake' : ''}`}
          value={value}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '')
            setValue(v)
            if (error) setError('')
          }}
          placeholder="······"
          autoComplete="off"
        />
        <button type="submit" className="open-btn">
          Aç 🔓
        </button>
        <div className="error-msg">{error}</div>
      </form>
    </div>
  )
}
