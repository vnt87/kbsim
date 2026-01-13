import { useSelector, useDispatch } from 'react-redux'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { toggleTheme } from '../features/themeProvider/themeProviderSlice'
import logoSvg from '../assets/images/logo.svg'

function Header() {
    const currentTheme = useSelector((state) => state.themeProvider.current)
    const dispatch = useDispatch()

    return (
        <header className={`min-h-[6vh] flex items-center justify-center transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-[#212121] text-white' : 'bg-white text-black'}`}>
            <div className="flex w-full max-w-[1048px] justify-between items-center mx-2.5 my-2.5">
                {/* Logo */}
                <div className="flex items-center gap-2 px-6 text-2xl font-medium font-['Bai_Jamjuree']">
                    <img src={logoSvg} className="align-text-top" alt="kbsim logo" height="32" width="32" />
                    kbsim
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="px-6 cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="Toggle theme"
                >
                    {currentTheme === 'light' ? (
                        <MoonIcon className="w-5 h-5" />
                    ) : (
                        <SunIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
        </header>
    )
}

export default Header
