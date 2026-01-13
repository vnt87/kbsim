import { useSelector } from 'react-redux'
import Header from './components/Header'
import KeySimulator from './features/keySimulator/KeySimulator'
import Footer from './components/Footer'

function App() {
  const currentTheme = useSelector((state) => state.themeProvider.current)

  return (
    <div className={`min-h-screen transition-colors duration-200 ${currentTheme === 'dark' ? 'dark bg-[#212121]' : 'light bg-white'}`}>
      <Header />
      <KeySimulator />
      <Footer />
    </div>
  )
}

export default App
