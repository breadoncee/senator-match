import { type CandidateProfile } from "@/types/candidate-profile";

// Mock API call - in a real app, this would fetch from an API
export const getCandidateProfile = async (
  candidateId: string
): Promise<CandidateProfile> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    candidate_id: candidateId,
    full_name: "Candidate Name",
    nickname: "Nickname",
    party: "Party Name",
    bailiwick: "Region",
    age: 45,
    birth_date: "1978-01-01",
    years_of_service: 8,
    education: {
      graduate: "Master in Public Administration",
      tertiary: ["Bachelor of Laws"],
      secondary: "High School",
    },
    political_experience: ["Senator (2016-present)", "Congressman (2010-2016)"],
    notable_legislation: [
      "Education Reform Act of 2018",
      "Healthcare Accessibility Law",
    ],
    policy_focus: ["Education", "Healthcare", "Economic Development"],
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
    imageUrl: "/placeholder.svg?height=100&width=100",
    matchScore: 0.85,
    isTopMatch: true,
  };
};
