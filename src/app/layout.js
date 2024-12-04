import localFont from "next/font/local";
import "../public/globals.css";

const AnonymousPro = localFont({
  src: "../public/fonts/Anonymous_Pro.ttf",
  variable: "--font-anonymous-pro",
  weight: "100 900",
});

export const metadata = {
  title: "PravoBot",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${AnonymousPro.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
