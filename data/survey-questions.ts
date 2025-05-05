export type SurveyQuestion = {
  id: string;
  text: string;
  section?: string;
  inputType: "radio" | "slider" | "checkbox";
  options?: {
    label: string;
    value: string;
  }[];
  min?: number;
  max?: number;
  step?: number;
};

export const surveyQuestions: SurveyQuestion[] = [
  // Section 1: Personal Values and Social Issues
  {
    id: "q01",
    text: "Do you support same-sex marriage?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q02",
    text: "Do you support the legalization of medical marijuana?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q03",
    text: "Do you support the death penalty?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q04",
    text: "Do you support the legalization of abortion?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q05",
    text: "Do you support divorce legalization?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q06",
    text: "Do you support banning political dynasties?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q07",
    text: "Do you support a shift to federalism?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q08",
    text: "Do you support the current War on Drugs?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Needs Reform", value: "needs_reform" },
      { label: "Unsure", value: "unsure" },
    ],
  },
  {
    id: "q09",
    text: "Do you support the passage of the SOGIE Equality Bill?",
    section: "Personal Values and Social Issues",
    inputType: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Unsure", value: "unsure" },
    ],
  },

  // Section 2: Policy Priorities
  {
    id: "q10",
    text: "How important is protecting farmers' rights to you?",
    section: "Policy Priorities",
    inputType: "slider",
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: "q11",
    text: "How important are human rights to you?",
    section: "Policy Priorities",
    inputType: "slider",
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: "q12",
    text: "How important is food security to you?",
    section: "Policy Priorities",
    inputType: "slider",
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: "q13",
    text: "How important is healthcare reform to you?",
    section: "Policy Priorities",
    inputType: "slider",
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: "q14",
    text: "How important is education access to you?",
    section: "Policy Priorities",
    inputType: "slider",
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: "q15",
    text: "How important is anti-corruption to you?",
    section: "Policy Priorities",
    inputType: "slider",
    min: 1,
    max: 5,
    step: 1,
  },

  // Section 3: Political Experience and Background Preferences
  {
    id: "q16",
    text: "Do you prefer candidates with long government experience?",
    section: "Political Experience and Background",
    inputType: "radio",
    options: [
      { label: "Yes, the more experience the better", value: "yes" },
      { label: "Some experience is enough", value: "some" },
      { label: "No, I prefer fresh faces", value: "no" },
    ],
  },
  {
    id: "q17",
    text: "Does the educational background of a candidate matter to you?",
    section: "Political Experience and Background",
    inputType: "radio",
    options: [
      { label: "Yes, top universities matter", value: "yes" },
      { label: "Somewhat, but not critical", value: "somewhat" },
      { label: "No, not important", value: "no" },
    ],
  },

  // Section 4: Legislative Work
  {
    id: "q18",
    text: "Which types of laws do you care about most?",
    section: "Legislative Work",
    inputType: "checkbox",
    options: [
      { label: "Agriculture and rural development", value: "agriculture" },
      { label: "Education access and reform", value: "education" },
      { label: "Health (e.g., cancer care, vaccination)", value: "health" },
      {
        label: "Women's rights (e.g., maternity leave)",
        value: "womens_rights",
      },
      { label: "Internet and technology", value: "technology" },
      { label: "Youth development and values education", value: "youth" },
      {
        label: "Public transportation and infrastructure",
        value: "infrastructure",
      },
      { label: "Labor and employment rights", value: "labor" },
    ],
  },

  // Section 5: Candidate Preferences
  {
    id: "q19",
    text: "Would you prefer candidates affiliated with a specific political party?",
    section: "Candidate Preferences",
    inputType: "radio",
    options: [
      { label: "Liberal Party", value: "liberal" },
      { label: "Nacionalista", value: "nacionalista" },
      { label: "PDP-Laban", value: "pdp_laban" },
      { label: "Independent", value: "independent" },
      { label: "No preference", value: "no_preference" },
    ],
  },
];
