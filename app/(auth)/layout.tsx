import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex mid-h-screen w-full justify-between font-inter">
        {children}
        <div className="auth-asset">
          <div>
            <Image 
            src='/icons/auth-image.png'
            alt="authimage"
            width={650}
            height={1000}
            />
          </div>
        </div>
    </main>
  );
}