import ClientWrapper from "@/components/ClientWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <main>{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
}
