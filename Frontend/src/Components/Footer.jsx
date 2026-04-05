import React from 'react'
import Logo from "../../public/Logo.png"


function Footer() {
  return (
    <>
              <footer className="bg-zinc-950 text-zinc-400 py-20 px-6 border-t border-zinc-800">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <img src={Logo} alt="Logo" className="size-10 rounded-full" />
                      <span className="text-2xl font-black text-white">Zenith</span>
                    </div>
                    <p className="text-sm leading-relaxed">Your companion for emotional intelligence and daily growth.</p>
                  </div>
                 
                </div>
              </footer>
    </>
  )
}


export default Footer