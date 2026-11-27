// Shared client/server rules. Profile references are syntax-checked, never fetched.
// Identity, account activity and proposal suitability require human review.
export const INQUIRY_TYPES = [
  ['funding', 'Funding from Wano'],
  ['paid-participation', 'Wano pays for an event/project'],
  ['advertise', 'Advertise on Wano'],
  ['sponsor-wano', 'Sponsor Wano'],
  ['community', 'Community or content project'],
  ['strategic', 'Investment or strategic partner'],
  ['press', 'Press or media'],
  ['support', 'Technical or account help'],
  ['other', 'Other partnership'],
] as const
export type InquiryType = typeof INQUIRY_TYPES[number][0]
export const isFinancial = (type: string) => type === 'funding' || type === 'paid-participation'
export const inquiryDestination = (type: string) => type === 'advertise' ? '/advertise' : type === 'press' ? '/press' : type === 'support' ? '/help' : null
export const LIMITS = { name: 100, email: 254, company: 120, country: 60, profile: 300, role: 100, participation: 400, communityBenefit: 400, message: 1200 } as const
export const ACKNOWLEDGMENT = 'Your inquiry has been received. We review proposals individually and may contact you if there is a suitable opportunity. Submission does not create a partnership or financial commitment.'
export type Inquiry = Record<keyof typeof LIMITS, string> & { inquiryType: InquiryType; acknowledgment: boolean }
export type Validation = { ok: true; value: Inquiry } | { ok: false; errors: Record<string, string> }

const HANDLE = new RegExp('^[\\p{L}\\p{M}\\p{N}_.-]{1,100}$', 'u')

export function normalizeProfile(input: string): string | null {
  const value = input.trim()
  if (!value || value.length > LIMITS.profile || /[\s\u0000-\u001f\u007f]/.test(value)) return null
  const handle = value.startsWith('@') ? value.slice(1) : value
  if (HANDLE.test(handle)) return `@${handle}`
  try {
    const url = new URL(/^(?:www\.|devbe\.)?wanoafrica\.com\//i.test(value) ? `https://${value}` : value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port || !['wanoafrica.com', 'www.wanoafrica.com', 'devbe.wanoafrica.com'].includes(url.hostname)) return null
    const path = decodeURIComponent(url.pathname).replace(/\/$/, '')
    if ((path.startsWith('/@') && HANDLE.test(path.slice(2))) || /^\/u\/[a-f0-9]{24}$/i.test(path)) return `https://${url.hostname}${url.pathname.replace(/\/$/, '')}`
  } catch { /* malformed references are returned as field errors */ }
  return null
}

export function validateInquiry(input: unknown): Validation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, errors: { form: 'Please complete the inquiry form.' } }
  const raw = input as Record<string, unknown>
  const errors: Record<string, string> = {}
  const text = {} as Record<keyof typeof LIMITS, string>
  for (const [field, max] of Object.entries(LIMITS)) {
    const key = field as keyof typeof LIMITS
    const item = raw[key]
    text[key] = typeof item === 'string' ? item.trim() : ''
    if (item != null && typeof item !== 'string') errors[key] = 'Enter text in this field.'
    else if (text[key].length > max) errors[key] = `Use ${max} characters or fewer.`
    else if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text[key])) errors[key] = 'Remove unsupported control characters.'
  }
  const inquiryType = typeof raw.inquiryType === 'string' ? raw.inquiryType : ''
  if (!INQUIRY_TYPES.some(([value]) => value === inquiryType)) errors.inquiryType = 'Choose an inquiry type.'
  if (inquiryDestination(inquiryType)) errors.inquiryType = 'Please use the linked advertising, press or help page for this enquiry.'
  for (const key of ['name', 'email', 'message'] as const) if (!text[key]) errors[key] = 'This field is required.'
  if (text.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.email)) errors.email = 'Enter a valid email address.'
  if (/[\r\n]/.test(text.name)) errors.name = 'Enter your name on one line.'
  if (text.profile) {
    const profile = normalizeProfile(text.profile)
    if (!profile) errors.profile = 'Enter a Wano @handle or a Wano profile link shared from the app or website.'
    else text.profile = profile
  }
  const financial = isFinancial(inquiryType)
  if (financial) {
    for (const key of ['profile', 'role', 'participation', 'communityBenefit'] as const) if (!text[key]) errors[key] = 'This field is required for financial requests.'
    if (raw.acknowledgment !== true) errors.acknowledgment = 'Please acknowledge the partnership expectations.'
  }
  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, value: { ...text, inquiryType: inquiryType as InquiryType, acknowledgment: financial && raw.acknowledgment === true,
    // Unmounted financial answers must not follow a switch to an unrelated enquiry.
    role: financial ? text.role : '', participation: financial ? text.participation : '', communityBenefit: financial ? text.communityBenefit : '' } }
}

export function inquiryMessage(value: Inquiry): string {
  const label = INQUIRY_TYPES.find(([type]) => type === value.inquiryType)![1]
  return [
    `Inquiry: ${label}`, value.profile ? `Wano profile (not verified): ${value.profile}` : 'Wano profile: not provided',
    ...(isFinancial(value.inquiryType) ? [`Representative role: ${value.role}`, `Participation on Wano: ${value.participation}`, `Community benefit: ${value.communityBenefit}`, 'Partnership expectations acknowledged: yes'] : []),
    '', isFinancial(value.inquiryType) ? 'Contribution requested (amount/currency if applicable):' : 'Proposal:', value.message,
  ].join('\n')
}
