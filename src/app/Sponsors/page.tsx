"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CARD_OUTER_RADIUS_PX,
  cardGlassBackground,
  cardSurfaceClasses,
} from "../components/cardTokens";
import { contentContainerClass } from "../components/layoutTokens";

type Sponsor = {
  name: string;
  logo: string;
};

type SponsorSection = {
  heading: string;
  sponsors: Sponsor[];
};

const sponsorSections: SponsorSection[] = [
  {
    heading: "",
    sponsors: [
      { name: "Title Sponsor", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761776975/Frame_6_ovygne.png" },
       { name: "Associate Sponsor", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761776977/Frame_7_dhtso3.png" },
        { name: "Bath & Body Care Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761777213/Bath_and_Body_Care_Partner-01_yikda6.png" },
        { name: "Event Sponsor", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761776975/Frame_3_f63gkl.png" },
        { name: "Gaming Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761776977/Frame_2_p2ixkg.png" },
        { name: "Health Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761776976/Frame_1_thjs1t.png" },
        { name: "Hydration Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761778434/Bisleri-logo_1_-02_uk3vbk.png" },
        { name: "Music Streaming Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761778730/Jio_Saavn_Logo_-_White_1_-01_y5thay.png" },
        { name: "Official Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761778633/WhatsApp_Image_2025-10-26_at_08.32.48_50955266_2_uv0sat.png" },
        { name: "Refreshment Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761776976/Frame_8_zx36bt.png" },
        { name: "Snacking Partner", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761778925/Frame_9_oxoau1.png" },
        { name: "Alumni Network Navigators", logo: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761779008/Alumni_Network_Navigators-01_peog5m.png" },
        ],
  },
 
];

const pageStyles = {
  main: "relative isolate max-w-[100vw] overflow-hidden text-white",
  container: `${contentContainerClass} section-content flex flex-col`,
  headerShell: "mx-auto max-w-3xl text-center",
  headerBadge: "text-xs uppercase tracking-[0.35em] text-sky-300/80 sm:text-sm",
  headerTitle:
    "mt-3 text-3xl font-semibold leading-tight sm:mt-4 sm:text-4xl lg:text-5xl",
  headerCopy: "mt-3 text-sm text-slate-300 sm:mt-4 sm:text-base",
  sections: "flex flex-col sponsor-subsections",
  sectionCluster: "sponsor-subsection-inner",
  sectionHeadingWrap:
    "mx-auto flex w-full max-w-xl items-center justify-center gap-3",
  sectionHeadingText:
    "text-center text-sm font-medium uppercase tracking-[0.25em] text-sky-200/90 sm:text-base lg:text-lg lg:tracking-[0.3em]",
  grid: "grid gap-4 grid-cols-1 justify-items-center sm:grid-cols-2 sm:gap-6 lg:grid-cols-3",
  logoBox: "relative w-full pb-[100%]",
  logoImage: "object-cover",
  sponsorName: "text-xs font-medium text-slate-100 sm:text-sm",
} as const;

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const outerRadius = CARD_OUTER_RADIUS_PX;

  return (
    <motion.article
      className={`group relative flex w-full max-w-sm flex-col overflow-hidden text-center shadow-2xl transition duration-200 ease-out ${cardSurfaceClasses} ${cardGlassBackground} hover:border-sky-400/80`}
      style={{
        borderRadius: `${outerRadius}px`,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0.6, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={pageStyles.logoBox}>
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 220px"
            quality={90}
            className={`${pageStyles.logoImage} transition duration-300 group-hover:scale-[1.02]`}
          />
        </div>
      </motion.div>
      <div className="px-4 py-4">
        <p className={pageStyles.sponsorName}>{sponsor.name}</p>
      </div>
    </motion.article>
  );
}

function SponsorSection({ heading, sponsors }: SponsorSection) {
  return (
    <section className={pageStyles.sectionCluster}>
      <div className={pageStyles.sectionHeadingWrap}>
        <h2 className={pageStyles.sectionHeadingText}>{heading}</h2>
      </div>
      <div className={pageStyles.grid}>
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className={pageStyles.main}>
      <div className={pageStyles.container}>
        <header className={`${pageStyles.headerShell}`}>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            SPONSORS
          </h1>
        </header>

        <div className={pageStyles.sections}>
          {sponsorSections.map((section) => (
            <SponsorSection
              key={section.heading}
              heading={section.heading}
              sponsors={section.sponsors}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
