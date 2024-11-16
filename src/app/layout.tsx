import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body>
        <div className="flex">
          {children}
        </div>
      </body>
    </html>
  );
}
