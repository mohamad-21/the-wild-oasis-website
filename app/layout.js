import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import '@/app/_styles/globals.css';
import ReservationProvider from "@/app/_contexts/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Home | The Wild Oasis'
  },
  description: 'Luxorious Cabin Hotel, Located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased min-h-screen flex flex-col bg-primary-950 text-primary-100`}>
        <Header />
        <div className="p-8 flex-1 flex flex-col">
          <main className="w-full mb-12 max-w-6xl mx-auto flex-1 flex flex-col">
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </main>
          <footer className="text-sm max-w-6xl mx-auto">Copyright by the wild oasis &copy; {new Date().getFullYear()}</footer>
        </div>
      </body>
    </html>
  )
}