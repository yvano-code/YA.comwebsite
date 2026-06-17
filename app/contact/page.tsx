import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: siteConfig.contact.blurb,
}

export default function ContactPage() {
  const { contact, social } = siteConfig

  return (
    <div className="w-full bg-white min-h-[calc(100vh-100px)] text-black pt-16 pb-32">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 h-full">
        
        {/* Left Column */}
        <div className="flex flex-col max-w-md pt-8">
          <div className="space-y-4">
            <h1 className="text-xl md:text-2xl font-bold tracking-wider uppercase leading-snug">
              LET'S START A CONVERSATION ABOUT YOUR PROJECT.
            </h1>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 leading-relaxed">
              {contact.blurb}
              <br />
              SEND A MESSAGE VIA THE CONTACT FORM OR EMAIL DIRECTLY:{" "}
              <a href={`mailto:${contact.email}`} className="text-black hover:text-gray-500 transition-colors">
                {contact.email}
              </a>
            </p>
            
            {/* Form */}
            <form className="flex flex-col gap-6 pt-8">
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-transparent border-b border-black/20 pb-2 text-sm font-medium focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                required
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent border-b border-black/20 pb-2 text-sm font-medium focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                required
              />
              <textarea 
                placeholder="Message" 
                rows={4}
                className="bg-transparent border-b border-black/20 pb-2 text-sm font-medium focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-400"
                required
              />
              <div className="pt-4">
                <button 
                  type="button" 
                  className="text-xs font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors flex items-center"
                >
                  → SEND
                </button>
              </div>
            </form>

            {contact.repName && (
              <div className="pt-12">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                  {contact.repName}
                </p>
                {contact.repEmail && (
                  <a
                    href={`mailto:${contact.repEmail}`}
                    className="text-sm font-bold tracking-wide uppercase hover:text-gray-500 transition-colors"
                  >
                    {contact.repEmail}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between items-end h-full pt-8">
          <div className="w-full max-w-[500px] aspect-[4/3] bg-gray-100 overflow-hidden ml-auto">
            <img 
              src="https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&q=80&w=1000"
              alt="Editorial" 
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="flex flex-col items-end gap-1 mt-16 lg:mt-32">
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-2">SOCIALS</span>
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">
                INSTAGRAM
              </a>
            )}
            {social.vimeo && (
              <a href={social.vimeo} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">
                VIMEO
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">
                YOUTUBE
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
