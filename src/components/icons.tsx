type IconProps = { size?: number; strokeWidth?: number; className?: string }

export function WhatsAppIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} fill="currentColor" aria-hidden>
      <path d="M16.003 2.003C8.277 2.003 2 8.28 2 16.003c0 2.484.64 4.87 1.858 6.975L2.003 30l7.222-1.833A13.93 13.93 0 0016.003 30c7.723 0 13.997-6.277 13.997-14S23.726 2.003 16.003 2.003zm0 25.502a11.44 11.44 0 01-5.823-1.588l-.418-.247-4.284 1.086 1.116-4.18-.27-.43a11.41 11.41 0 01-1.818-6.143c0-6.32 5.147-11.464 11.497-11.464 3.072 0 5.957 1.196 8.126 3.368a11.41 11.41 0 013.368 8.107c0 6.32-5.147 11.49-11.494 11.49zm6.303-8.594c-.345-.173-2.044-1.007-2.361-1.122-.316-.114-.547-.172-.777.173-.23.346-.892 1.122-1.094 1.352-.2.23-.402.259-.748.086-.345-.173-1.456-.537-2.773-1.712-1.025-.915-1.717-2.044-1.918-2.39-.2-.346-.022-.533.15-.705.155-.154.345-.403.518-.605.173-.201.23-.345.345-.576.115-.23.058-.432-.029-.605-.086-.173-.777-1.872-1.065-2.563-.28-.672-.563-.58-.777-.59l-.662-.01a1.27 1.27 0 00-.92.43c-.316.346-1.208 1.18-1.208 2.879s1.237 3.338 1.41 3.569c.172.23 2.433 3.713 5.896 5.207.823.356 1.466.568 1.967.727.826.263 1.579.226 2.173.137.663-.1 2.044-.836 2.33-1.644.288-.807.288-1.5.202-1.644-.086-.144-.316-.23-.662-.403z" />
    </svg>
  )
}

export function FacebookIcon({ size = 15, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function InstagramIcon({ size = 15, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function LinkedinIcon({ size = 15, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function YoutubeIcon({ size = 15, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}
