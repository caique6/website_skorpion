import './globals.css';

export const metadata = {
  title: 'Resgate VIP',
  description: 'Sistema de resgate para membros'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}