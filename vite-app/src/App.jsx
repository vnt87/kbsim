import { useSelector } from 'react-redux'
import Header from './components/Header'
import KeySimulator from './features/keySimulator/KeySimulator'
import Footer from './components/Footer'
import { Particles } from './components/ui/Particles'
import { GeoCloud } from './components/ui/GeoCloud'
import { FogBackground } from './components/ui/FogBackground'
import { FloatingPaths } from './components/ui/FloatingPaths'
import { WaveBackground } from './components/ui/WaveBackground'
import { MatrixRain } from './components/ui/MatrixRain'
import { ShaderLines } from './components/ui/ShaderLines'
import { FallingStars } from './components/ui/FallingStars'
import { Supernova } from './components/ui/Supernova'
import { BACKGROUND_EFFECTS } from './features/themeProvider/themeProviderSlice'

function App() {
  const currentTheme = useSelector((state) => state.themeProvider.current)
  const backgroundEffect = useSelector((state) => state.themeProvider.backgroundEffect)

  const renderBackground = () => {
    switch (backgroundEffect) {
      case BACKGROUND_EFFECTS.PARTICLES:
        return (
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
        )
      case BACKGROUND_EFFECTS.GEOCLOUD:
        return <GeoCloud className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.FOG:
        return <FogBackground className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.PATHS:
        return <FloatingPaths className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.WAVES:
        return <WaveBackground className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.MATRIX:
        return <MatrixRain className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.SHADER_LINES:
        return <ShaderLines className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.FALLING_STARS:
        return <FallingStars className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.SUPERNOVA:
        return <Supernova className="fixed inset-0 z-0" />
      case BACKGROUND_EFFECTS.NONE:
      default:
        return null
    }
  }

  return (
    <div className={`relative min-h-screen transition-colors duration-200 ${currentTheme === 'dark' ? 'dark bg-[#212121]' : 'light bg-white'}`}>
      {/* Background effect */}
      {renderBackground()}

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


