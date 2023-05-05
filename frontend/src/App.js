import React from 'react'
import TranscriptionForm from './components/TranscriptionForm'
import ParticleEffect from './components/ParticleEffect'


const App = () => {
  return (
    <div style={{ position: "relative", zIndex: "2 !important" }}>
      <ParticleEffect />
      <TranscriptionForm />
    </div>
  )
}

export default App