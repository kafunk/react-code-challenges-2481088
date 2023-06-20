import { useState } from "react";

export default function DarkMode () {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`page ${isDarkMode ? 'dark-mode' : ''}`}>
      <button className='dark-mode-button' onClick={() => setIsDarkMode(true)}>Dark Mode</button>
      <button className='light-mode-button' onClick={() => setIsDarkMode(false)}>Light Mode</button>
    </div>
  )
}
