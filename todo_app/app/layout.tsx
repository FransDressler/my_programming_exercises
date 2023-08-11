import type { Metadata } from 'next'
// app/layout.js
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Josefin_Sans } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const josefin_Sans = Josefin_Sans({ subsets: [] })


export const metadata: Metadata = {
  title: 'Todo app',
  description: 'This is a simple todo app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
