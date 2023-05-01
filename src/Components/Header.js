import React from 'react'
import AccountCircle from './AccountCircle'
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
import SpeedIcon from '@mui/icons-material/Speed';

export default function Header() {
  return (
    <div className='header'>
      <div className='logo'><SpeedIcon style={{transform: 'scale(1.25)'}}/><KeyboardAltIcon style={{transform: 'scale(1.25)'}}/>
      </div><h1>Typing Speed Test</h1>
      <div className='accunt'><AccountCircle/></div>
    </div>
  )
}
