import React from "react";
import Image from "next/image"; // Assuming you'll use next/image for optimized images

interface GptToolCardProps {
  title: string;
  description: string;
  link: string;
  imageSrc: string; // Path to your image in the public folder
  gptsLink: string;
}

const gptToolsData: GptToolCardProps[] = [
  {
    title: "VeriPol's Election Super Assistant",
    description:
      "Everything you need to know about the 2025 elections and its candidates",
    link: "https://chatgpt.com/g/g-681cabfa13ec8191a1f9394b4ae9f85f-veripol-s-election-super-assistant",
    imageSrc: "/veripol-election-super-assistant.png",
    gptsLink: "chatgpt.com",
  },
  {
    title: "VeriPol's Local Candidate Research Assistant",
    description: "Help people research about local candidates",
    link: "https://chatgpt.com/g/g-681ca83da97c819181a34b28ab4b25b0-veripol-s-local-candidate-research-assistant",
    imageSrc: "/veripol-local-research-assistant.png",
    gptsLink: "chatgpt.com",
  },
  {
    title: "VeriPol's PartylistGPT",
    description: "Helps Voters find partylists that align with their values",
    link: "https://chatgpt.com/g/g-681c9b0513488191baa67dfd5d2195b6-veripol-s-partylistgpt",
    imageSrc: "/veripol-partylist-assistant.png",
    gptsLink: "chatgpt.com",
  },
];

const GptToolCard: React.FC<GptToolCardProps> = ({
  title,
  description,
  link,
  imageSrc,
  gptsLink,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <div className="relative w-full h-48">
        {" "}
        {/* Adjust height as needed */}
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex items-center text-sm text-primary font-medium mb-4">
          {/* You might want a generic GPT logo here if available */}
          {/* <Image src="/gpts-logo-placeholder.png" alt="GPT" width={16} height={16} className="mr-2" /> */}
          <span>{gptsLink}</span>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block bg-primary hover:bg-primary/90 text-white text-center font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out"
        >
          Try it out
        </a>
      </div>
    </div>
  );
};

const GptToolsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Explore VeriPol GPTs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gptToolsData.map((tool) => (
            <GptToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GptToolsSection;
