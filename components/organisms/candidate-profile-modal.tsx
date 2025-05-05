"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { CandidateProfile } from "@/types/candidate-profile";
import { JSX } from "react";

type CandidateProfileModalProps = {
  candidate: CandidateProfile;
  onClose: () => void;
};

export function CandidateProfileModal({
  candidate,
  onClose,
}: CandidateProfileModalProps) {
  // Calculate age if birth_date is provided
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const displayAge =
    candidate.age ||
    (candidate.birth_date ? calculateAge(candidate.birth_date) : null);

  // Helper function to render stance
  const renderStance = (stance: boolean | null): JSX.Element => {
    if (stance === true) {
      return <span className="text-green-600 font-medium">Supports</span>;
    } else if (stance === false) {
      return <span className="text-red-600 font-medium">Opposes</span>;
    } else {
      return <span className="text-gray-500 italic">No stated position</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-10">
          <h2 className="text-xl font-bold">Candidate Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close profile"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {/* Header with basic info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={
                  candidate.imageUrl || "/placeholder.svg?height=128&width=128"
                }
                alt={candidate.full_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{candidate.full_name}</h1>
              {candidate.nickname && (
                <p className="text-xl text-gray-600">"{candidate.nickname}"</p>
              )}
              <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {candidate.party}
                </span>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                  {candidate.bailiwick}
                </span>
                {candidate.matchScore && (
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {Math.round(candidate.matchScore * 100)}% Match
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayAge && (
                <div>
                  <span className="font-medium text-gray-600">Age:</span>{" "}
                  {displayAge} years
                </div>
              )}
              {candidate.birth_date && (
                <div>
                  <span className="font-medium text-gray-600">Birth Date:</span>{" "}
                  {new Date(candidate.birth_date).toLocaleDateString()}
                </div>
              )}
              {candidate.years_of_service !== null && (
                <div>
                  <span className="font-medium text-gray-600">
                    Years in Public Service:
                  </span>{" "}
                  {candidate.years_of_service}
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
              Education
            </h2>
            <div className="space-y-3">
              {candidate.education.graduate && (
                <div>
                  <span className="font-medium text-gray-600">Graduate:</span>{" "}
                  {candidate.education.graduate}
                </div>
              )}
              {candidate.education.tertiary.length > 0 && (
                <div>
                  <span className="font-medium text-gray-600">
                    Undergraduate:
                  </span>
                  <ul className="list-disc pl-5 mt-1">
                    {candidate.education.tertiary.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}
              {candidate.education.secondary && (
                <div>
                  <span className="font-medium text-gray-600">
                    Secondary Education:
                  </span>{" "}
                  {candidate.education.secondary}
                </div>
              )}
            </div>
          </div>

          {/* Political Experience */}
          {candidate.political_experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
                Political Experience
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {candidate.political_experience.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Notable Legislation */}
          {candidate.notable_legislation.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
                Notable Legislation
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {candidate.notable_legislation.map((law, index) => (
                  <li key={index}>{law}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Policy Focus */}
          {candidate.policy_focus.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
                Policy Focus Areas
              </h2>
              <div className="flex flex-wrap gap-2">
                {candidate.policy_focus.map((policy, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {policy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stances on Issues */}
          <div className="mb-8">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">
              Stances on Key Issues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <span className="font-medium text-gray-600">
                  Same-Sex Marriage:
                </span>{" "}
                {renderStance(candidate.stances_on_issues.same_sex_marriage)}
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Death Penalty:
                </span>{" "}
                {renderStance(candidate.stances_on_issues.death_penalty)}
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Legalization of Abortion:
                </span>{" "}
                {renderStance(
                  candidate.stances_on_issues.legalization_of_abortion
                )}
              </div>
              <div>
                <span className="font-medium text-gray-600">Divorce:</span>{" "}
                {renderStance(candidate.stances_on_issues.divorce)}
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Banning Political Dynasties:
                </span>{" "}
                {renderStance(
                  candidate.stances_on_issues.banning_of_political_dynasty
                )}
              </div>
              <div>
                <span className="font-medium text-gray-600">
                  Medical Marijuana:
                </span>{" "}
                {renderStance(
                  candidate.stances_on_issues.legalization_of_medical_marijuana
                )}
              </div>
              <div>
                <span className="font-medium text-gray-600">Federalism:</span>{" "}
                {renderStance(candidate.stances_on_issues.federalism)}
              </div>
              <div>
                <span className="font-medium text-gray-600">War on Drugs:</span>{" "}
                {renderStance(candidate.stances_on_issues.war_on_drugs)}
              </div>
              <div>
                <span className="font-medium text-gray-600">SOGIE Bill:</span>{" "}
                {renderStance(candidate.stances_on_issues.sogie_bill)}
              </div>
            </div>
          </div>

          {/* Sources and References */}
          <div className="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">
            <p>
              Data sources: Official campaign materials, public statements,
              voting records, and legislative history. Last updated: May 2023.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
