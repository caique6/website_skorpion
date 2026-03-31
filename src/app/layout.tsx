import './globals.css';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'], 
  variable: '--font-dm-sans',
});

export const metadata = {
  title: 'Resgate VIP - Skorpion Gamer',
  description: 'Clube de Membros do Skorpion Gamer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}