// Translations and explanations for key political issues and survey questions

export type IssueExplanation = {
  tagalog: string;
  explanation: string;
};

export const issueTranslations: Record<string, IssueExplanation> = {
  same_sex_marriage: {
    tagalog: "Kasal ng Parehong Kasarian",
    explanation:
      "Legal recognition of marriage between individuals of the same sex, granting them the same legal rights and benefits as heterosexual couples.",
  },
  death_penalty: {
    tagalog: "Parusang Kamatayan",
    explanation:
      "The legally authorized killing of someone as punishment for a crime, which was abolished in the Philippines in 2006 but continues to be debated.",
  },
  legalization_of_abortion: {
    tagalog: "Pagsasabatas ng Aborsiyon",
    explanation:
      "Allowing legal access to abortion services. Currently, abortion is illegal in the Philippines under all circumstances.",
  },
  divorce: {
    tagalog: "Diborsyo",
    explanation:
      "Legal dissolution of marriage. The Philippines is one of the few countries where divorce is not legal (except for Filipino Muslims).",
  },
  banning_of_political_dynasty: {
    tagalog: "Pagbabawal sa Political Dynasty",
    explanation:
      "Prohibiting members of the same family from holding multiple elected positions, which is addressed in the 1987 Constitution but lacks enabling legislation.",
  },
  legalization_of_medical_marijuana: {
    tagalog: "Pagsasabatas ng Medikal na Marijuana",
    explanation:
      "Allowing the use of marijuana for medical purposes to treat certain conditions and symptoms under professional supervision.",
  },
  federalism: {
    tagalog: "Pederalismo",
    explanation:
      "A system of government where power is divided between a central authority and constituent political units, giving regions more autonomy.",
  },
  war_on_drugs: {
    tagalog: "Kampanya Laban sa Droga",
    explanation:
      "Government campaign against illegal drugs, which became controversial under the Duterte administration due to alleged human rights violations.",
  },
  sogie_bill: {
    tagalog: "SOGIE Equality Bill",
    explanation:
      "Sexual Orientation, Gender Identity and Expression (SOGIE) Equality Bill aims to prevent discrimination based on sexual orientation and gender identity.",
  },
};

// Translations for survey questions
export const questionTranslations: Record<string, IssueExplanation> = {
  q01: {
    tagalog: "Sumusuporta ka ba sa kasal ng parehong kasarian?",
    explanation:
      "This question asks about your stance on same-sex marriage, which would give LGBTQ+ couples the same legal rights as heterosexual couples.",
  },
  q02: {
    tagalog: "Sumusuporta ka ba sa pagsasabatas ng medikal na marijuana?",
    explanation:
      "This asks if you support legalizing marijuana for medical purposes, which advocates argue can help patients with certain conditions.",
  },
  q03: {
    tagalog: "Sumusuporta ka ba sa parusang kamatayan?",
    explanation:
      "This asks if you support reinstating the death penalty in the Philippines, which was abolished in 2006.",
  },
  q04: {
    tagalog: "Sumusuporta ka ba sa pagsasabatas ng aborsiyon?",
    explanation:
      "This asks if you support legalizing abortion, which is currently illegal in the Philippines under all circumstances.",
  },
  q05: {
    tagalog: "Sumusuporta ka ba sa pagsasabatas ng diborsyo?",
    explanation:
      "This asks if you support legalizing divorce, as the Philippines is one of the few countries where divorce is not legal (except for Filipino Muslims).",
  },
  q06: {
    tagalog: "Sumusuporta ka ba sa pagbabawal ng political dynasty?",
    explanation:
      "This asks if you support prohibiting members of the same family from holding multiple elected positions simultaneously.",
  },
  q07: {
    tagalog: "Sumusuporta ka ba sa paglipat sa pederalismo?",
    explanation:
      "This asks if you support changing the Philippines' government system to federalism, which would give more autonomy to regions.",
  },
  q08: {
    tagalog: "Sumusuporta ka ba sa kasalukuyang War on Drugs?",
    explanation:
      "This asks about your stance on the government's campaign against illegal drugs, which became controversial due to alleged human rights violations.",
  },
  q09: {
    tagalog: "Sumusuporta ka ba sa pagpasa ng SOGIE Equality Bill?",
    explanation:
      "This asks if you support the Sexual Orientation, Gender Identity and Expression (SOGIE) Equality Bill, which aims to prevent discrimination.",
  },
  q10: {
    tagalog:
      "Gaano kahalaga sa iyo ang pagprotekta sa karapatan ng mga magsasaka?",
    explanation:
      "This asks how important protecting farmers' rights is to you, including land rights, fair prices, and agricultural support.",
  },
  q11: {
    tagalog: "Gaano kahalaga sa iyo ang karapatang pantao?",
    explanation:
      "This asks how important human rights are to you, including civil liberties, freedom from discrimination, and protection from abuse.",
  },
  q12: {
    tagalog: "Gaano kahalaga sa iyo ang seguridad sa pagkain?",
    explanation:
      "This asks how important food security is to you, which involves ensuring all citizens have reliable access to affordable, nutritious food.",
  },
  q13: {
    tagalog: "Gaano kahalaga sa iyo ang reporma sa healthcare?",
    explanation:
      "This asks how important healthcare reform is to you, including improving access to quality healthcare services and reducing costs.",
  },
  q14: {
    tagalog: "Gaano kahalaga sa iyo ang access sa edukasyon?",
    explanation:
      "This asks how important education access is to you, including making quality education available to all Filipinos regardless of income.",
  },
  q15: {
    tagalog: "Gaano kahalaga sa iyo ang paglaban sa korapsyon?",
    explanation:
      "This asks how important anti-corruption efforts are to you, including measures to prevent and punish corrupt practices in government.",
  },
  q16: {
    tagalog:
      "Mas gusto mo ba ang mga kandidatong may mahabang karanasan sa gobyerno?",
    explanation:
      "This asks whether you prefer candidates with extensive government experience or those who are relatively new to politics.",
  },
  q17: {
    tagalog:
      "Mahalaga ba sa iyo ang educational background ng isang kandidato?",
    explanation:
      "This asks how important a candidate's educational qualifications are to you when deciding who to vote for.",
  },
  q18: {
    tagalog: "Anong uri ng mga batas ang pinakamahalagang sa iyo?",
    explanation:
      "This asks which policy areas you care about most, to help match you with candidates who focus on these issues.",
  },
  q19: {
    tagalog:
      "Mas gusto mo ba ang mga kandidatong kaalyado ng isang partikular na political party?",
    explanation:
      "This asks if you have a preference for candidates from specific political parties or if party affiliation doesn't matter to you.",
  },
};

// Function to get translation and explanation for issues
export function getIssueInfo(issue: string): IssueExplanation {
  return (
    issueTranslations[issue] || {
      tagalog: issue,
      explanation: "No explanation available",
    }
  );
}

// Function to get translation and explanation for questions
export function getQuestionInfo(questionId: string): IssueExplanation {
  return (
    questionTranslations[questionId] || {
      tagalog: "",
      explanation: "No explanation available",
    }
  );
}
