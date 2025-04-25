import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Header />
      <main >
        <Outlet /> {/* Aquí se renderiza la ruta hija */}
      </main>
      <Footer />
    </>
  )
}
