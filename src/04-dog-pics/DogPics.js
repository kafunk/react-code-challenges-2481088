import { useState, useEffect } from 'react'

export default function DogPics () {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(updateImgSrc, [])

  return (
    <div className='dog-pics'>
      <img src={imgSrc}/>
      <button onClick={updateImgSrc}>🐶</button>
    </div>
  )

  async function updateImgSrc() {
    let newImgSrc = await fetchImgSrc();
    setImgSrc(newImgSrc)
  }
}

async function fetchImgSrc() {

  let imgSrc = await fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(json => json.message)
    .catch(err => console.log("error:", err.message))

  return imgSrc;
}