"use server"

import type { CandidateProfile } from "@/types/candidate-profile"
import { candidates } from "@/data/mock-candidates"

// This would typically fetch from an API or database
export async function getCandidateProfile(candidateId: string): Promise<CandidateProfile | null> {
  // Find the basic candidate info
  const basicCandidate = candidates.find((c) => c.candidateId === candidateId)

  if (!basicCandidate) return null

  // Mock extended profile data
  const mockProfiles: Record<string, Partial<CandidateProfile>> = {
    sen001: {
      bailiwick: "Metro Manila",
      birth_date: "1975-06-15",
      age: 48,
      years_of_service: 15,
      education: {
        graduate: "Master of Public Administration, University of the Philippines",
        tertiary: ["Bachelor of Arts in Political Science, University of the Philippines"],
        secondary: "Philippine Science High School",
      },
      political_experience: [
        "Secretary of Education (2016-2022)",
        "Senator (2010-2016)",
        "Congresswoman, 2nd District of Manila (2004-2010)",
      ],
      notable_legislation: [
        "Universal Access to Quality Education Act",
        "Women's Rights Protection Act",
        "Healthcare Reform Bill of 2015",
      ],
      policy_focus: ["Education", "Women's Rights", "Healthcare", "Social Welfare"],
      stances_on_issues: {
        same_sex_marriage: true,
        death_penalty: false,
        legalization_of_abortion: true,
        divorce: true,
        banning_of_political_dynasty: true,
        legalization_of_medical_marijuana: true,
        federalism: false,
        war_on_drugs: false,
        sogie_bill: true,
      },
      nickname: "Maria",
    },
    sen002: {
      bailiwick: "Central Luzon",
      birth_date: "1968-11-23",
      age: 55,
      years_of_service: 25,
      education: {
        graduate: "Master of Business Administration, Ateneo de Manila University",
        tertiary: ["Bachelor of Science in Economics, Ateneo de Manila University"],
        secondary: "San Beda College",
      },
      political_experience: [
        "Secretary of Trade and Industry (2018-2022)",
        "Governor of Pampanga (2010-2018)",
        "Mayor of San Fernando, Pampanga (2001-2010)",
      ],
      notable_legislation: [
        "Economic Development Act of 2019",
        "Infrastructure Modernization Bill",
        "Foreign Investment Liberalization Act",
      ],
      policy_focus: ["Economy", "Infrastructure", "Agriculture", "Foreign Investment"],
      stances_on_issues: {
        same_sex_marriage: false,
        death_penalty: true,
        legalization_of_abortion: false,
        divorce: false,
        banning_of_political_dynasty: false,
        legalization_of_medical_marijuana: false,
        federalism: true,
        war_on_drugs: true,
        sogie_bill: false,
      },
      nickname: "Tony",
    },
    // Add more mock profiles for other candidates...
  }

  // Merge basic info with extended profile
  const extendedInfo = mockProfiles[candidateId] || {}

  return {
    candidate_id: basicCandidate.candidateId,
    full_name: basicCandidate.name,
    party: basicCandidate.party,
    bailiwick: extendedInfo.bailiwick || "National",
    age: extendedInfo.age || null,
    birth_date: extendedInfo.birth_date || "",
    years_of_service: extendedInfo.years_of_service || null,
    education: extendedInfo.education || {
      graduate: "Information not available",
      tertiary: ["Information not available"],
      secondary: "Information not available",
    },
    political_experience: extendedInfo.political_experience || [],
    notable_legislation: extendedInfo.notable_legislation || [],
    policy_focus: extendedInfo.policy_focus || basicCandidate.legislativeFocus || [],
    stances_on_issues: extendedInfo.stances_on_issues || {
      same_sex_marriage: null,
      death_penalty: null,
      legalization_of_abortion: null,
      divorce: null,
      banning_of_political_dynasty: null,
      legalization_of_medical_marijuana: null,
      federalism: null,
      war_on_drugs: null,
      sogie_bill: null,
    },
    nickname: extendedInfo.nickname || undefined,
    imageUrl: basicCandidate.imageUrl,
    matchScore: basicCandidate.matchScore,
    isTopMatch: basicCandidate.isTopMatch,
  }
}
