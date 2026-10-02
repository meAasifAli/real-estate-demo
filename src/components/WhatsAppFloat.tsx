import { whatsappLink } from '@/lib/data'
import { WhatsAppIcon } from './icons'

// Desktop/tablet only — on phones WhatsApp lives in the bottom tab bar
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hello! I'm interested in properties from LuxeEstates. Can you help me?")}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float hidden md:flex w-14 h-14 bg-[#25D366] text-white rounded-full items-center justify-center shadow-xl hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={30} />
    </a>
  )
}
