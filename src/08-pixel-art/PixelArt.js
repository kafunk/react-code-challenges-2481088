import { createContext, useContext, useState } from 'react'

const ColorCtx = createContext({ activeColor: '', setActiveColor: () => {} });

function ColorPicker () {
  const colors = ['red', 'blue', 'yellow', 'green', 'black', 'white', 'purple']
  const { setActiveColor } = useContext(ColorCtx);

  return (
    <div>
      <h1>Choose a color</h1>
      {colors.map(color => <button
        key={color}
        style={{ backgroundColor: color }}
        onClick={() => setActiveColor(color)}
      />)}
    </div>
  )
}

function Pixel () {
  const { activeColor } = useContext(ColorCtx);

  return <div
    style={{ height: '20px', width: '20px', backgroundColor: 'lightGrey', margin: '1px' }}
    onClick={(e) => e.target.style.backgroundColor = activeColor}
  />
}

function Pixels () {
  const pixels = []
  for (let i = 0; i < 100; i++) pixels.push(<Pixel key={i} />)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', width: '210px', margin: '0 auto' }}>
      {pixels}
    </div>
  )
}

export default function PixelArt () {
  const [activeColor, setActiveColor] = useState('lightGrey');

  return (
    <ColorCtx.Provider value={{ activeColor, setActiveColor }}>
      <ColorPicker />
      <Pixels />
    </ColorCtx.Provider>
  )
}
