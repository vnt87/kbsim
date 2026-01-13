import { useSelector, useDispatch } from 'react-redux'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { toggleTheme, setBackgroundEffect, BACKGROUND_EFFECTS } from '../features/themeProvider/themeProviderSlice'
import logoSvg from '../assets/images/logo.svg'

function Header() {
    const currentTheme = useSelector((state) => state.themeProvider.current)
    const backgroundEffect = useSelector((state) => state.themeProvider.backgroundEffect)
    const dispatch = useDispatch()

    const dropdownClass = `px-2 py-1 rounded border ${currentTheme === 'dark'
        ? 'border-[#444] bg-[#333] text-white'
        : 'border-[#ddd] bg-white text-black'
        } font-['Bai_Jamjuree'] text-sm cursor-pointer focus:outline-none`

    return (
        <header className={`min-h-[6vh] flex items-center justify-center transition-colors duration-200 ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>
            <div className="flex w-full max-w-[1048px] justify-between items-center mx-2.5 my-2.5">
                {/* Logo */}
                <div className="flex items-center gap-2 px-6 text-2xl font-medium font-['Bai_Jamjuree']">
                    <img src={logoSvg} className="align-text-top" alt="Phímhub logo" height="32" width="32" />
                    Phímhub
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 px-6">
                    {/* Background Effect Dropdown */}
                    <select
                        className={dropdownClass}
                        value={backgroundEffect}
                        onChange={(e) => dispatch(setBackgroundEffect(e.target.value))}
                        aria-label="Background Effect"
                    >
                        <option value={BACKGROUND_EFFECTS.PARTICLES}>✨ Particles</option>
                        <option value={BACKGROUND_EFFECTS.GEOCLOUD}>🌐 Geo Cloud</option>
                        <option value={BACKGROUND_EFFECTS.FOG}>🌫️ Fog</option>
                        <option value={BACKGROUND_EFFECTS.PATHS}>🛣️ Paths</option>
                        <option value={BACKGROUND_EFFECTS.WAVES}>🌊 Waves</option>
                        <option value={BACKGROUND_EFFECTS.MATRIX}>💻 Matrix</option>
                        <option value={BACKGROUND_EFFECTS.SHADER_LINES}>🪄 Shader Lines</option>
                        <option value={BACKGROUND_EFFECTS.FALLING_STARS}>🌠 Falling Stars</option>
                        <option value={BACKGROUND_EFFECTS.SUPERNOVA}>💥 Supernova</option>
                        <option value={BACKGROUND_EFFECTS.NONE}>⬛ None</option>
                    </select>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        aria-label="Toggle theme"
                    >
                        {currentTheme === 'light' ? (
                            <MoonIcon className="w-5 h-5" />
                        ) : (
                            <SunIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header

