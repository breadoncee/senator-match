import { SectionTitle } from "../atoms/section-title";

type KeyStanceListProps = {
  stances: string[];
};

export function KeyStanceList({ stances }: KeyStanceListProps) {
  return (
    <div>
      <SectionTitle>Key Stances</SectionTitle>
      <ul className="space-y-2">
        {stances.map((stance, i) => (
          <li key={i} className="flex items-start">
            <div className="mr-2 mt-1 text-green-500 flex-shrink-0">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm">{stance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
