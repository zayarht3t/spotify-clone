import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToastProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spofity Clone',
  description: 'Lisen to music',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const songs =await getSongsByUserId();
  const modifiedSongs = songs.flat();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider/>
                <Sidebar songs={modifiedSongs}>
                  {children}
                </Sidebar>               
            </UserProvider>
          </SupabaseProvider>
      </body>
    </html>
  )
}
