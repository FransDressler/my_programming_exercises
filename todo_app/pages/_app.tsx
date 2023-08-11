import { Josefin_Sans } from 'next/font/google';
import Page from './page'
 
// If loading a variable font, you don't need to specify the font weight
const josefin_Sans = Josefin_Sans({ subsets: ['latin'] })
 
export default function MyApp() {
  return (
    <main className={josefin_Sans.className}>
        <Page/>
        <div>
    <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
  </div>
    </main>
    
  )
}