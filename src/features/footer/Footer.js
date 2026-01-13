import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as GitHub } from './../../assets/images/github.svg'
import { ReactComponent as Discord } from './../../assets/images/discord.svg'
import styles from './Footer.module.css';

// <img src={github} height="15" width="15"/> GitHub
const Footer = ({ currentTheme, theme }) => (
  <div
    className={styles.footerContainer}
    style={{
      backgroundColor: theme.background,
      color: theme.text
    }}
  >
    {/* 
    <a 
      href="https://github.com/tplai/kbsim" 
      target="_blank" 
      rel="noopener"
      className={`${styles.link} ${currentTheme == "light" ? styles.light : styles.dark}`}
    >
      <div className={styles.linkColor}>
        <GitHub
          alt-text="GitHub logo"
          style={{
            height: "15px",
            width: "15px",
          }}
        /> GitHub
      </div>
    </a>
    */}
    {/* Discord link removed as requested */}
  </div>
)

const mapStateToProps = (state) => {
  return {
    currentTheme: state.themeProvider.current,
    theme: state.themeProvider.theme,
  }
}

export default connect(mapStateToProps)(Footer);
