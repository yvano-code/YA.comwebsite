import { siteConfig } from "@/lib/site-config"

export default function EditorialPage() {
  return (
    <div className="w-full bg-white min-h-screen text-black pt-32 pb-32">
      <div className="mx-auto w-full px-4 md:px-8 lg:px-12 space-y-32">
        {siteConfig.editorial.map((group, index) => (
          <div key={index} className="w-full flex flex-col">
            {/* Meta Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-xs sm:text-sm font-semibold tracking-wide">
              <div className="md:col-span-2">
                <span className="text-gray-400 block mb-1">Client:</span>
                <span className="underline decoration-1 underline-offset-4">{group.client}</span>
              </div>
              <div className="md:col-span-1">
                <span className="text-gray-400 block mb-1">Font:</span>
                <span className="underline decoration-1 underline-offset-4">{group.font}</span>
              </div>
              <div className="md:col-span-1">
                <span className="text-gray-400 block mb-1">Release:</span>
                <span>{group.release}</span>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {group.images.map((img, i) => (
                <div 
                  key={i} 
                  className={`relative ${
                    i === 0 ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${group.client} ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
