import { useSelector } from 'react-redux'
import Header from './components/Header'
import KeySimulator from './features/keySimulator/KeySimulator'
import Footer from './components/Footer'
import { Particles } from './components/ui/Particles'

function App() {
  const currentTheme = useSelector((state) => state.themeProvider.current)

  return (
    <div className={`relative min-h-screen transition-colors duration-200 ${currentTheme === 'dark' ? 'dark bg-[#212121]' : 'light bg-white'}`}>
      {/* Subtle background particles */}
      <Particles
        className="fixed inset-0 z-0"
        quantity={50}
        staticity={80}
        ease={80}
        size={0.5}
        color={currentTheme === 'dark' ? '#888888' : '#333333'}
        vx={0}
        vy={0}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <KeySimulator />
        <Footer />
      </div>
    </div>
  )
}

export default App

