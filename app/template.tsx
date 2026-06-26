export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ animation: "fadeIn 0.3s ease-in-out forwards" }}>
      {children}
    </div>
  )
}
