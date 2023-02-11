import React from 'react'

const Footer = () => {
    const d = new Date();
    let year = d.getFullYear();
  return (
    <div>
        <p className='text-center p-3'>Ⓒ CopyRight{year} | <a href="https://sureshjangid.in" target="-black">Suresh Jangid</a></p>
    </div>
  )
}

export default Footer