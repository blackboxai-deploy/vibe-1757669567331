import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3D Commerce - Interactive Shopping Experience',
  description: 'Modern 3D e-commerce website with interactive product visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}