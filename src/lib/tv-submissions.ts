import fs from 'fs'
import path from 'path'

export interface FilmSubmission {
  id: string
  createdAt: string
  fullName: string
  email: string
  phone?: string
  country: string
  city?: string
  productionCompany?: string
  filmTitle: string
  countryRepresented: string
  yearCompleted: string
  runtime: string
  category: string
  languages: string
  subtitles: string
  synopsis: string
  viewingLink: string
  viewingPassword?: string
  trailerLink?: string
  posterFileName?: string
  posterDataUrl?: string
  rightsConfirmed: boolean
  status: 'New' | 'Under Review' | 'Shortlisted' | 'Selected' | 'Declined' | 'Licensed' | 'Published'
}

const DATA_DIR = path.join(process.cwd(), 'data')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'tv-submissions.json')

function ensureStorage(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8')
  }
}

export function getAllSubmissions(): FilmSubmission[] {
  try {
    ensureStorage()
    const content = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8')
    return JSON.parse(content || '[]') as FilmSubmission[]
  } catch (err) {
    console.error('Error reading tv-submissions.json:', err)
    return []
  }
}

export function saveSubmission(submissionData: Omit<FilmSubmission, 'id' | 'createdAt' | 'status'>): FilmSubmission {
  ensureStorage()
  const submissions = getAllSubmissions()
  
  // Generate human-readable short submission ID: WTV-XXXXXX
  const randomNum = Math.floor(100000 + Math.random() * 900000)
  const id = `WTV-${randomNum}`
  
  const newSubmission: FilmSubmission = {
    ...submissionData,
    id,
    createdAt: new Date().toISOString(),
    status: 'New',
  }

  submissions.unshift(newSubmission)
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8')
  
  return newSubmission
}
