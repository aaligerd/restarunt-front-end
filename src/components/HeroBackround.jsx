import React from 'react'
import  "../css/HeroBackground.css"

function HeroBackround() {
  return (
    <div id='hero-container'>
        <div id='img-container'>
            <img src={require('../assets/hero.jpg')} alt="" />
        </div>
        <div id='hero-text'>
            <p>Welcome</p>
            <p>to</p>
            <p>Majumder's</p>
            <button>Explore</button>
        </div>
        <div className='order-tooltip'>
            <p>order now</p>
        </div>
    </div>
  )
}

export default HeroBackround