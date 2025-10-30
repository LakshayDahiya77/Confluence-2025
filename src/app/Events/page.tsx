"use client";

import { useMemo, useState, KeyboardEvent, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedDropdown from "../components/AnimatedDropdown";
import {
  CARD_OUTER_RADIUS_PX,
  CARD_PADDING_PX,
  cardGlassBackground,
  cardSurfaceClasses,
} from "../components/cardTokens";
import { contentContainerClass } from "../components/layoutTokens";
import OptimizedImage from "../components/OptimizedImage";
import Pagination, { usePagination } from "../components/Pagination";

type Event = {
  eventName: string;
  image: string;
  venue?: string;
  clubName?: string;
  description?: string;
};

const clubNames = [
  "All Clubs",
  "Audio and Visual Aid",
  "Fine Arts",
  "Managing and Directing Club",
  "Colours",
  "Photography Club",
];

const allEvents: Event[] = [
  {
    eventName: "Picture Perfect",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595184/PerfectpictureQR8_txvvz3.png",
    venue: "Online Event",
    clubName: "Photography Club",
    description: "Intergalactic dance-off under the stars",
  },
  {
    eventName: "Cinematography",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595185/Group_15_copy_3_jk8jml.png",
    venue: "Online Event",
    clubName: "Photography Club",
    description: "Electronic beats from another dimension",
  },
  {
    eventName: "Fest through my Lens",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595186/FTML_6_mxiorg.jpg",
    venue: "Online Event",
    clubName: "Photography Club",
    description: "Runway show featuring cosmic couture",
  },
  {
    eventName: "Travel Diaries",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595187/traveldiaries_htf2yh.png",
    venue: "Creative Space",
    clubName: "Photography Club",
    description: "Visual art from across the universe",
  },
  {
    eventName: "LimeLight",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595191/Limelight_pxpsjb.png",
    venue: "AB block",
    clubName: "Photography Club",
    description: "Spoken word under moonlight",
  },
  {
    eventName: "Impressions",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595192/Impressions_ob4skm.jpg",
    venue: "Online Event",
    clubName: "Photography Club",
    description: "Compete in the ultimate esports challenge",
  },
  {
    eventName: "Get Set Logo",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595197/Get_Set_Logo_6-01-6_wqgu8q.png",
    venue: "Online Event",
    clubName: "Photography Club",
    description: "Contemporary and hip-hop fusion",
  },
  {
    eventName: "Fest In Shorts",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761595200/FEST_IN_SHORTS_FINAL_xg7udq.png",
    venue: "Online Event",
    clubName: "Photography Club",
    description: "Stand-up comedy from the stars",
  },
  {
    eventName: "JigSaw",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761597139/jigsaw25_1_-min_x0j4ku.png",
    venue: "Photog Stall",
    clubName: "Photography Club",
    description: "Test your knowledge across dimensions",
  },
  {
    eventName: "Photo Factory",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761597154/PHOTO_FACTORY_1_-min_txwqss.png",
    venue: "Online Event",
    clubName: "Photography Club",
    description: "Interactive theater under open skies",
  },
  {
    eventName: "Shutterbug",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761597160/SHUTTERBUGFINAL2_1_-min_vy97az.png",
    venue: "Online EVent",
    clubName: "Photography Club",
    description: "Vocal percussion from the cosmos",
  },
  {
    eventName: "Scanvenger Hunt",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761597166/WDEFRG-min_khjukf.png",
    venue: "Photog Stall",
    clubName: "Photography Club",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Solo Singing",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761597349/solo_Singing_sosemh.png",
    venue: "Jubilee Hall",
    clubName: "Managing and Directing Club",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Game Of Trails",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761716700/GOT_2_dg34jy.png",
    venue: "OAT Backside",
    clubName: "Colours",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Colours Got Talent",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761716712/CGL9_ou4pjn.png",
    venue: "First Floor E block",
    clubName: "Colours",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "League of Fun",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761716723/IMG_8145_lezy4i.png",
    venue: "Sports Complex",
    clubName: "Colours",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "WeVolve",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761716794/IMG_8125_k1i1qy.png",
    venue: "ED HALL GROUND FLOOR",
    clubName: "Colours",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "CrossOver Carnival",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761717028/CROSSOVER_CARNIVAL_FINAL_3_wqkdhr.png",
    venue: "Juiblee HAll",
    clubName: "Audio and Visual Aid",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Mesh It Up",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761717042/music_party_night_i8hlvn.png",
    venue: "",
    clubName: "Audio and Visual Aid",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Harlem Shake",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761717126/HARLEM_SHAKE_jbpvgz.png",
    venue: "Online Event",
    clubName: "Audio and Visual Aid",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "DUBSMASH",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761717173/DUBSMASH_WITH_LOGOS_FINAL_io76eb.png",
    venue: "Online Event",
    clubName: "Audio and Visual Aid",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "BeatBoxing",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761717548/BEATBOX_FINAL_2_w9a8to.png",
    venue: "Jubilee Hall",
    clubName: "Audio and Visual Aid",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Calligraphy",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761751202/11_ty4vxm.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Nail Painting",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761751287/5_lubdik.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Face Painting",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761751425/2_onidbh.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Digital Canvas",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761751481/7_qabu3y.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Abstract Painting",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761751581/9_bvpyaw.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Waste O Wonder",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761751880/4_qyldbq.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Pot Painting",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761752011/6_fkwtl4.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Let's Ink It",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761752081/3_zwvlwm.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Art A Thon",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761752127/1_afzgxz.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Tattoo Making",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761752140/SAVE_20251029_130908_ftn0bw.jpg",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Mandala making",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761752163/15_zoi53b.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  {
    eventName: "Origasmi",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761752175/Smile_gymi5y.png",
    venue: "ED Hall",
    clubName: "Fine Arts",
    description: "Live painting inspired by the universe",
  },
  // Local posters from public/Events Posters - appended so we don't remove existing entries
  // ELAD
  {
    eventName: "Brainstorm",
    image: "/Events Posters/ELAD/BRAINSTORM.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Build A Story",
    image: "/Events Posters/ELAD/BUILD A STORY.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Debate",
    image: "/Events Posters/ELAD/DEBATE.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Fan Fic",
    image: "/Events Posters/ELAD/FAN FIC.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Fandom",
    image: "/Events Posters/ELAD/FANDOM.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Just A Minute",
    image: "/Events Posters/ELAD/JUST A MINUTE.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Open Mic",
    image: "/Events Posters/ELAD/OPEN MIC.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Prodigy",
    image: "/Events Posters/ELAD/PRODIGY.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Spent",
    image: "/Events Posters/ELAD/SPENT.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  {
    eventName: "Voiceover Pete",
    image: "/Events Posters/ELAD/VOICEOVER PETE.jpg",
    clubName: "ELAD",
    description: "ELAD club event",
  },
  // HLAD
  {
    eventName: "Aap Ki Sansad",
    image: "/Events Posters/HLAD/AAP KI SANSAD.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Abhivyakti",
    image: "/Events Posters/HLAD/ABHIVYAKTI.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Adhikari",
    image: "/Events Posters/HLAD/ADHIKARI.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Axar",
    image: "/Events Posters/HLAD/AXAR.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Bollywood Masti",
    image: "/Events Posters/HLAD/BOLLYWOOD MASTI.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Chakravyuh",
    image: "/Events Posters/HLAD/CHAKRAVUEH.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Creative Writing",
    image: "/Events Posters/HLAD/CREATIVE WRITING.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Kavi Sammelan",
    image: "/Events Posters/HLAD/KAVI SAMMELAN.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Know India Quiz",
    image: "/Events Posters/HLAD/KNOW INIA QUIZ.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Lafz",
    image: "/Events Posters/HLAD/LAFZ.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  {
    eventName: "Patrakar Babu",
    image: "/Events Posters/HLAD/PATRAKAR BABU.webp",
    clubName: "HLAD",
    description: "HLAD club event",
  },
  // Managing and Directing Club
  {
    eventName: "Ad Wars",
    image: "/Events Posters/Managing and Directing Club/AD WARS.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Battle of Bands",
    image: "/Events Posters/Managing and Directing Club/BATTLE OF BANDS.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Break A Leg",
    image: "/Events Posters/Managing and Directing Club/BREAK A LEG.jpg",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Cineverse",
    image: "/Events Posters/Managing and Directing Club/CINEVERSE.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Duet Singing",
    image: "/Events Posters/Managing and Directing Club/DUET SINGING.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Ekanki",
    image: "/Events Posters/Managing and Directing Club/EKANKI.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Folk Dance",
    image: "/Events Posters/Managing and Directing Club/FOLK DANCE.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Fourth Wall",
    image: "/Events Posters/Managing and Directing Club/FOURTH WALL.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Groove Armada",
    image: "/Events Posters/Managing and Directing Club/GROOVE ARMADA.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Harmonically Mellow",
    image:
      "/Events Posters/Managing and Directing Club/HARMONICALLY mellow.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Libas",
    image: "/Events Posters/Managing and Directing Club/LIBAS.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Mime",
    image: "/Events Posters/Managing and Directing Club/MIME.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Moonlight Sonata",
    image: "/Events Posters/Managing and Directing Club/MOONLIGHT SONATA.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Nukkad Natak",
    image: "/Events Posters/Managing and Directing Club/NUKKAD NATAK.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Solo Singing",
    image: "/Events Posters/Managing and Directing Club/SOLO SINGING.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Street Battle",
    image: "/Events Posters/Managing and Directing Club/STREET BATTLE.jpg",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Two To Tango",
    image: "/Events Posters/Managing and Directing Club/TWO TO TANGO.jpg",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  {
    eventName: "Wardrobe Wars",
    image: "/Events Posters/Managing and Directing Club/WARDROBE WARS.webp",
    clubName: "Managing and Directing Club",
    description: "Managing and Directing Club event",
  },
  // Spicmacay
  {
    eventName: "Jam Project 3.0",
    image: "/Events Posters/Spicmacay/JAM PROJECT 3.0.jpg",
    clubName: "Spicmacay",
    description: "Spicmacay club event",
  },
];

function EventCard({ event }: { event: Event }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  const overlayRadius = CARD_OUTER_RADIUS_PX - CARD_PADDING_PX;

  return (
    <motion.div
      className={`relative flex cursor-pointer flex-col ${cardSurfaceClasses} ${cardGlassBackground} w-full max-w-sm overflow-hidden`}
      style={{
        borderRadius: `${CARD_OUTER_RADIUS_PX}px`,
        minHeight: "400px",
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isExpanded}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
    >
      {/* Poster Container - Fixed layout */}
      <div
        className="relative w-full bg-gradient-to-b from-slate-900/50 to-slate-900/30"
        style={{
          aspectRatio: "3 / 4.2",
          borderTopLeftRadius: `${overlayRadius}px`,
          borderTopRightRadius: `${overlayRadius}px`,
          borderBottomLeftRadius: isExpanded ? `${overlayRadius}px` : "0px",
          borderBottomRightRadius: isExpanded ? `${overlayRadius}px` : "0px",
        }}
      >
        {/* Image - stays fixed */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            borderTopLeftRadius: `${overlayRadius}px`,
            borderTopRightRadius: `${overlayRadius}px`,
            borderBottomLeftRadius: isExpanded ? `${overlayRadius}px` : "0px",
            borderBottomRightRadius: isExpanded ? `${overlayRadius}px` : "0px",
          }}
        >
          <OptimizedImage
            src={event.image}
            alt={event.eventName}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Title Bar - Only visible when NOT expanded */}
      <motion.div
        className="flex items-center justify-center border-t border-white/30 bg-black/40 px-5 py-3 text-center text-white backdrop-blur-md"
        style={{
          borderBottomLeftRadius: `${overlayRadius}px`,
          borderBottomRightRadius: `${overlayRadius}px`,
        }}
        animate={{
          opacity: isExpanded ? 0 : 1,
          height: isExpanded ? 0 : "auto",
          paddingTop: isExpanded ? 0 : "0.75rem",
          paddingBottom: isExpanded ? 0 : "0.75rem",
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-base font-semibold uppercase tracking-wide sm:text-lg">
          {event.eventName}
        </h3>
      </motion.div>

      {/* Curtain Overlay - Covers entire card from bottom to top */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white backdrop-blur-lg pointer-events-none"
        style={{
          borderRadius: `${CARD_OUTER_RADIUS_PX}px`,
          backgroundColor: "rgba(8, 11, 26, 0.88)",
        }}
        initial={{ y: "100%" }}
        animate={{
          y: isExpanded ? "0%" : "100%",
        }}
        transition={{
          duration: 0.5,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <motion.div
          className="pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.2 : 0 }}
        >
          <h3 className="text-lg font-semibold uppercase tracking-wide sm:text-xl mb-4">
            {event.eventName}
          </h3>

          <div className="flex flex-col items-center gap-4">
            {event.description && (
              <p className="text-sm text-slate-200">{event.description}</p>
            )}

            <div className="flex flex-col items-center gap-2 text-sm">
              {event.venue && (
                <p className="text-slate-300">Venue: {event.venue}</p>
              )}
              {event.clubName && (
                <p className="text-slate-300">{event.clubName}</p>
              )}
            </div>

            <button className="rounded-md border border-white bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40">
              Learn More
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function EventsPage() {
  const [selectedClub, setSelectedClub] = useState("All Clubs");
  const sectionRef = useRef<HTMLElement>(null);

  const dropdownItems = useMemo(
    () => clubNames.map((club) => ({ id: club, label: club })),
    []
  );

  const handleSelectClub = (clubId: string) => {
    setSelectedClub(clubId);
  };

  const filteredEvents =
    selectedClub === "All Clubs"
      ? allEvents
      : allEvents.filter((event) => event.clubName === selectedClub);

  // Pagination: Reads config from CSS variables (--pagination-events-mobile/desktop)
  const {
    currentItems: paginatedEvents,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination(filteredEvents, "events");

  return (
    <main
      ref={sectionRef}
      className="relative max-w-[100vw] overflow-hidden text-white"
    >
      <div className={`${contentContainerClass} section-content`}>
        <motion.h1
          className="section-heading text-center text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          EVENTS
        </motion.h1>

        <div className="flex justify-center">
          <AnimatedDropdown
            items={dropdownItems}
            selectedId={selectedClub}
            onSelect={(item) => handleSelectClub(item.id)}
            placeholder="Filter by club"
            className="w-full sm:w-64"
          />
        </div>

        {/* {selectedClub !== "All Clubs" && (
          <motion.div
            className="mb-8 text-center text-4xl font-bold sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {selectedClub}
          </motion.div>
        )}
 */}
        <div className="grid grid-cols-1 gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          {paginatedEvents.map((event) => (
            <EventCard key={event.eventName} event={event} />
          ))}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sectionRef={sectionRef}
          className="mt-12"
        />
      </div>
    </main>
  );
}
