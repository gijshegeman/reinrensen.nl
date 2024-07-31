import './globals.css'

import { IBM_Plex_Sans } from 'next/font/google'

import Nav from '../components/nav'
import Footer from '../components/footer/page'

export const metadata = {
  title: 'Rein Rensen',
  description: 'The personal website of Rein Rensen.',
  icons: {
    icon: "/favicon.ico",
  },

}

const sans = IBM_Plex_Sans({
  weight: ['200', '300', '400'],
  subsets: ['latin']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sans.className}>
      <body
        className="
          flex flex-col
          w-screen
          min-h-screen

          bg-[#ececec]
          text-[14px]
          font-[300]
          tracking-widest

 
          
        "
      >
        <div className=' 
                
          md:px-16
          lg:px-[250px]
          xl:px-[350px]'>
          <Nav />
          <div>{children}</div>
        </div>

        <div className='flex-none w-full mt-auto self-end'><Footer /></div>
      </body>
    </html>
  )
}
