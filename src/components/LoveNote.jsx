import { useState, useEffect, useCallback, useRef } from 'react'

const HEART_EMOJIS = ['❤️', '💗', '💖', '💕', '💘', '🩷', '🤍', '💗']

function FloatingHearts() {
  const [hearts, setHearts] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const id = idRef.current++
      const heart = {
        id,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        left: Math.random() * 100,
        size: 0.8 + Math.random() * 1.2,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 2,
      }
      setHearts((prev) => [...prev.slice(-20), heart])
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hearts-container">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

function ConfettiExplosion() {
  const [pieces, setPieces] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const emojis = ['❤️', '💕', '💗', '💖', '💘', '🩷', '🎉', '✨', '🎊', '🤍', '💝']
    const newPieces = []
    for (let i = 0; i < 60; i++) {
      newPieces.push({
        id: idRef.current++,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        size: 0.8 + Math.random() * 1.5,
        duration: 2.5 + Math.random() * 3,
        delay: Math.random() * 1.5,
      })
    }
    setPieces(newPieces)
  }, [])

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function getRandomPosition() {
  const margin = 20
  return {
    x: margin + Math.random() * (100 - margin * 2),
    y: margin + Math.random() * (80 - margin),
  }
}

export default function LoveNote() {
  const [phase, setPhase] = useState('note') // 'note' | 'final'
  const [eminPos, setEminPos] = useState({ x: 50, y: 75 })
  const [showFinalConfetti, setShowFinalConfetti] = useState(false)
  const eminClickCount = useRef(0)

  const handleEminHover = useCallback(() => {
    setEminPos(getRandomPosition())
  }, [])

  const handleEminClick = useCallback(() => {
    eminClickCount.current++
    setEminPos(getRandomPosition())
  }, [])

  const handleEvet = useCallback(() => {
    setPhase('final')
    setShowFinalConfetti(true)
  }, [])

  if (phase === 'final') {
    return (
      <div className="final-screen">
        {showFinalConfetti && <ConfettiExplosion />}
        <h1>
          Seni çok seviyorum
          <br />
          Sevgilim ❤️
        </h1>
        <p>
          Yaşadığımız her an, birlikte yazdığımız her satır...
          <br />
          Ve daha nice güzel anlara, birlikte. 🤍
        </p>
      </div>
    )
  }

  return (
    <div className="love-note-screen">
      <FloatingHearts />
      <div className="love-note-content">
        <h1>İlk, tek ve son sevgilim olur musun?</h1>
        <p>
          İlk günümüzden beri.
          <br />
          Bugün de, yarın da, her zamannn seninleyim.
        </p>
        <div className="button-group">
          <button className="evet-btn" onClick={handleEvet}>
            Evet 💕
          </button>
          <button
            className="emin-btn"
            style={{
              position: 'absolute',
              left: `${eminPos.x}%`,
              top: `${eminPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={handleEminHover}
            onClick={handleEminClick}
          >
            Emin misin? 🥹
          </button>
        </div>
      </div>
    </div>
  )
}
