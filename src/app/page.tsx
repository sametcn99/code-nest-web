export default function Home() {
  return (
    <main className="font-montserrat p-0 m-0 h-screen bg-[#12131A] w-full">
    <div className="bg-transparent h-[85%] w-full flex items-center justify-center">
        <div>
        <h1 className="text-[52px] w-full flex items-center justify-center text-[#e5e7ebe7] font-semibold">CODENEST</h1>            <p className="mt-[-17px] mb-[13px] text-[22px] w-full flex items-center justify-center text-[#e5e7ebb9]">Projeleri Keşfet, Paylaş ve İş Birliği Yap</p>
            <div className="h-auto flex items-center justify-center px-[25px] gap-[15px]">
                <button className="rounded-[0.75rem] flex px-[25px] h-[41px] items-center cursor-pointer justify-center gap-[0.5rem] text-[#E5E7EB] border border-[rgba(255,255,255,0.137)] text-[14px] font-montserrat bg-[#1619239f] backdrop-blur-[10px] transition-all duration-200 ease-in-out z-[9999] hover:text-[rgba(255,255,255,0.774)] hover:bg-[rgba(255,255,255,0.082)]">
                    Başlayın
                </button>
                <button className="rounded-[0.75rem] flex px-[25px] h-[41px] items-center cursor-pointer justify-center gap-[0.5rem] text-[#E5E7EB] border border-[rgba(255,255,255,0.137)] text-[14px] font-montserrat bg-[#1619239f] backdrop-blur-[10px] transition-all duration-200 ease-in-out z-[9999] hover:text-[rgba(255,255,255,0.774)] hover:bg-[rgba(255,255,255,0.082)]">
                    Giriş Yap
                </button>
            </div>
        </div>
    </div>
</main>


  );
}
