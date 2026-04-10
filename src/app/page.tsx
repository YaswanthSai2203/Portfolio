import { HomeSections } from "@/components/home-sections";
import { SiteChrome } from "@/components/site-chrome";

export default function HomePage() {
  return (
    <SiteChrome>
      <main id="main">
        <HomeSections />
      </main>
    </SiteChrome>
  );
}
