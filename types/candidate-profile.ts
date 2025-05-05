export type CandidateEducation = {
  graduate: string
  tertiary: string[]
  secondary?: string
}

export type CandidateStances = {
  same_sex_marriage: boolean | null
  death_penalty: boolean | null
  legalization_of_abortion: boolean | null
  divorce: boolean | null
  banning_of_political_dynasty: boolean | null
  legalization_of_medical_marijuana: boolean | null
  federalism: boolean | null
  war_on_drugs: boolean | null
  sogie_bill: boolean | null
}

export type CandidateProfile = {
  candidate_id: string
  full_name: string
  nickname?: string
  party: string
  bailiwick: string
  age: number | null
  birth_date: string
  years_of_service: number | null
  education: CandidateEducation
  political_experience: string[]
  notable_legislation: string[]
  policy_focus: string[]
  stances_on_issues: CandidateStances
  imageUrl?: string
  matchScore?: number
  isTopMatch?: boolean
}
