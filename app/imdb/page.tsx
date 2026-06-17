export default function ImdbPage() {
  return (
    <div className="w-full bg-white text-black min-h-[80vh] flex flex-col items-center">
      <iframe 
        src="https://www.imdb.com/name/nm10504529/?ref_=tt_ov_1_1" 
        className="w-full min-h-[80vh] border-0"
        title="Yvano Antonio IMDB"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  )
}
