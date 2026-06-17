export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in duration-[1000ms] fill-mode-both ease-in-out">
      {children}
    </div>
  )
}
