import { profile } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

const desc =
  "Full stack .NET engineer: ASP.NET Core, React, Angular, Azure, AWS, microservices, and production AI systems.";

export function JsonLd() {
  const url = getSiteUrl();
  const sameAs = [profile.linkedin, profile.github].filter(Boolean);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url,
    sameAs,
    description: desc,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url,
    description: desc,
    author: { "@type": "Person", name: profile.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
