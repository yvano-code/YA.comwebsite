import { siteConfig } from "@/lib/site-config"

export default function EditorialPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24 mb-32">
      {/* Intro Header */}
      <header className="mb-24 text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-[0.2em] uppercase">Editorial</h1>
        <p className="text-muted-foreground uppercase tracking-[0.1em] text-sm leading-relaxed">
          A visual diary of ongoing studies, design philosophies, and experiments in aesthetic framing.
        </p>
      </header>

      {/* Editorial Content */}
      <div className="space-y-32">
        {siteConfig.editorial.map((item, index) => {
          const hasImage = Boolean(item.image)
          const hasText = Boolean(item.title || item.body)
          
          // Layout variations
          if (hasImage && !hasText) {
            // Full width or large centered image
            return (
              <figure key={index} className="w-full relative overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.title || "Editorial Image"} 
                  className="w-full h-auto max-h-[80vh] object-cover bg-muted transition-transform duration-1000 group-hover:scale-[1.02]" 
                />
              </figure>
            )
          }

          if (!hasImage && hasText) {
            // Text only, large typography
            return (
              <article key={index} className="max-w-3xl mx-auto text-center space-y-8 py-16 border-y border-border/40">
                {item.title && <h2 className="text-2xl font-semibold tracking-[0.15em] uppercase">{item.title}</h2>}
                {item.body && <p className="text-lg leading-relaxed text-muted-foreground">{item.body}</p>}
              </article>
            )
          }

          // Alternating Image + Text
          const isEven = index % 2 === 0

          return (
            <article 
              key={index} 
              className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              {/* Image half */}
              <figure className="w-full lg:w-1/2 relative overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.title || "Editorial Image"} 
                  className="w-full aspect-[4/5] object-cover bg-muted transition-transform duration-1000 group-hover:scale-[1.02]" 
                />
              </figure>

              {/* Text half */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 text-center lg:text-left px-4 lg:px-12">
                {item.title && (
                  <h2 className="text-3xl font-bold tracking-[0.15em] uppercase relative">
                    <span className="block absolute -top-8 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-8 h-[1px] bg-foreground"></span>
                    {item.title}
                  </h2>
                )}
                {item.body && (
                  <p className="text-muted-foreground leading-loose">
                    {item.body}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
