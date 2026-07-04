// Minimal layout for the test page to hide nav/footer if desired
export default function TestJasonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {children}
    </div>
  )
}
