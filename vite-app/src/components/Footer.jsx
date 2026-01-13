import { useSelector } from 'react-redux'

function Footer() {
    const currentTheme = useSelector((state) => state.themeProvider.current)

    return (
        <footer className={`min-h-[3vh] pb-2 flex items-center justify-center font-['Bai_Jamjuree'] transition-colors duration-200 ${currentTheme === 'dark' ? 'bg-[#212121] text-white' : 'bg-white text-black'}`}>
            <a href="https://github.com/vnt87/kbsim" target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
            </a>
        </footer>
    )
}

export default Footer
