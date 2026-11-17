// Names, slugs and search phrases for the topic, hashtag, sound and country pages.

export const COUNTRY_NAMES: Record<string, string> = {
  dz: 'Algeria', ao: 'Angola', bj: 'Benin', bw: 'Botswana', bf: 'Burkina Faso', bi: 'Burundi', cv: 'Cabo Verde',
  cm: 'Cameroon', cf: 'Central African Republic', td: 'Chad', km: 'Comoros', cg: 'Congo', cd: 'DR Congo',
  ci: "Côte d'Ivoire", dj: 'Djibouti', eg: 'Egypt', gq: 'Equatorial Guinea', er: 'Eritrea', sz: 'Eswatini',
  et: 'Ethiopia', ga: 'Gabon', gm: 'Gambia', gh: 'Ghana', gn: 'Guinea', gw: 'Guinea-Bissau', ke: 'Kenya',
  ls: 'Lesotho', lr: 'Liberia', ly: 'Libya', mg: 'Madagascar', mw: 'Malawi', ml: 'Mali', mr: 'Mauritania',
  mu: 'Mauritius', ma: 'Morocco', mz: 'Mozambique', na: 'Namibia', ne: 'Niger', ng: 'Nigeria', rw: 'Rwanda',
  st: 'São Tomé and Príncipe', sn: 'Senegal', sc: 'Seychelles', sl: 'Sierra Leone', so: 'Somalia',
  za: 'South Africa', ss: 'South Sudan', sd: 'Sudan', tz: 'Tanzania', tg: 'Togo', tn: 'Tunisia', ug: 'Uganda',
  zm: 'Zambia', zw: 'Zimbabwe', us: 'the United States', ca: 'Canada', gb: 'the UK', ie: 'Ireland', fr: 'France',
  be: 'Belgium', nl: 'the Netherlands', de: 'Germany', it: 'Italy', es: 'Spain', pt: 'Portugal', ch: 'Switzerland',
  se: 'Sweden', no: 'Norway', dk: 'Denmark', fi: 'Finland', at: 'Austria', ae: 'the UAE', sa: 'Saudi Arabia',
  qa: 'Qatar', kw: 'Kuwait', om: 'Oman', br: 'Brazil', jm: 'Jamaica', tt: 'Trinidad and Tobago', ht: 'Haiti',
  au: 'Australia', in: 'India', cn: 'China',
}

/** "Ugandan comedy videos" reads better than "comedy videos from Uganda" where there's a common adjective. */
export const DEMONYM: Record<string, string> = {
  ug: 'Ugandan', ng: 'Nigerian', ke: 'Kenyan', gh: 'Ghanaian', za: 'South African', tz: 'Tanzanian',
  cd: 'Congolese', cg: 'Congolese', cm: 'Cameroonian', rw: 'Rwandan', et: 'Ethiopian', sn: 'Senegalese',
  zm: 'Zambian', zw: 'Zimbabwean', ss: 'South Sudanese', bi: 'Burundian', mw: 'Malawian', ci: 'Ivorian',
  ml: 'Malian', sl: 'Sierra Leonean', lr: 'Liberian', so: 'Somali', sd: 'Sudanese', eg: 'Egyptian',
  ma: 'Moroccan', na: 'Namibian', bw: 'Botswana', mz: 'Mozambican', ao: 'Angolan', jm: 'Jamaican', ht: 'Haitian',
  br: 'Brazilian',
}

export const countrySlug = (cc: string) =>
  (COUNTRY_NAMES[cc] ?? cc).replace(/^the /, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const BY_SLUG: Record<string, string> = Object.fromEntries(Object.keys(COUNTRY_NAMES).map((cc) => [countrySlug(cc), cc]))
export const countryFromSlug = (slug: string) => BY_SLUG[(slug || '').toLowerCase()]

/** What people type into Google for each Wano topic. */
export const TOPICS: Record<string, { phrase: string; title: string; blurb: string }> = {
  comedy: { phrase: 'comedy videos and skits', title: 'Comedy and skits', blurb: 'Skits, pranks, stand-up and everyday jokes' },
  music: { phrase: 'music and dance videos', title: 'Music and dance', blurb: 'Covers, dance challenges, live sessions and new songs' },
  food_culture: { phrase: 'food and culture videos', title: 'Food and culture', blurb: 'Street food, recipes, traditions and celebrations' },
  learn_news: { phrase: 'education videos', title: 'Learn', blurb: 'How-tos, explainers and lessons' },
  local_news: { phrase: 'local news videos', title: 'Local news', blurb: 'What’s happening in towns and cities, from people who are there' },
  film: { phrase: 'short films and documentaries', title: 'Film and documentary', blurb: 'Short films, trailers, behind the scenes and documentaries' },
  sports: { phrase: 'sports videos', title: 'Sports', blurb: 'Football, boxing, athletics and grassroots sport' },
  fashion_beauty: { phrase: 'fashion and beauty videos', title: 'Fashion and beauty', blurb: 'Style, hair, make-up and designers' },
  health: { phrase: 'health and fitness videos', title: 'Health and wellness', blurb: 'Fitness, healthy food and wellbeing' },
  nature_travel: { phrase: 'travel and nature videos', title: 'Nature and travel', blurb: 'Places to visit, wildlife and landscapes' },
  faith: { phrase: 'gospel and faith videos', title: 'Faith and inspiration', blurb: 'Gospel music, sermons, worship and inspiration' },
  family: { phrase: 'family and relationship videos', title: 'Family and relationships', blurb: 'Family life, love and parenting' },
  farming_animals: { phrase: 'farming videos', title: 'Farming and animals', blurb: 'Farming tips, livestock and life on the land' },
  diaspora: { phrase: 'diaspora videos', title: 'Diaspora and community', blurb: 'African life abroad and communities around the world' },
  business_skills: { phrase: 'business and hustle videos', title: 'Business and skills', blurb: 'Small business, side hustles and practical skills' },
  tech_gaming: { phrase: 'tech and gaming videos', title: 'Tech and gaming', blurb: 'Phones, gadgets, games and apps' },
}

export const topicSlug = (key: string) => key.replace(/_/g, '-')
export const topicFromSlug = (slug: string) => {
  const k = (slug || '').replace(/-/g, '_')
  return TOPICS[k] ? k : undefined
}

/** "Ugandan comedy videos and skits" / "Comedy videos and skits from Haiti" / "African comedy videos and skits". */
export function topicHeading(topic: string, cc?: string | null) {
  const t = TOPICS[topic]
  if (!cc) return `African ${t.phrase}`
  const d = DEMONYM[cc]
  return d ? `${d} ${t.phrase}` : `${t.phrase.charAt(0).toUpperCase()}${t.phrase.slice(1)} from ${COUNTRY_NAMES[cc] ?? cc.toUpperCase()}`
}

export const slugify = (s: string) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
