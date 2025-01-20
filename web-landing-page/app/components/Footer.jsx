import React from 'react'

const Footer = () => {
  return (
    <footer
        className="bg-black text-white py-4 fixed bottom-0 w-full"
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "16px",
          letterSpacing: "0.32px",
          textAlign: "center",
        }}
      >
        Copyright 2023 © HackMotion | All Rights Reserved
      </footer>
  )
}

export default Footer