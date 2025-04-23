import React from 'react'
import logo from '../assets/big-meme.png'

const Header = () => {
  return (
    <header className='header'>
      <img src={logo} alt="Meme Generator Logo" />
      <h2 className="header--title">Meme Generator</h2>
    </header>
  )
}

export default Header   