// components/TeamSection.tsx

import Image from "next/image";
import { motion } from "framer-motion";
import {
  cardGlassBackground,
  cardOuterRadiusClass,
  cardSurfaceClasses,
} from "./cardTokens";
import { contentContainerClass } from "./layoutTokens";

const teamMembers = [
  {
    name: "Lakshay Dahiya",
    role: "Developer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761762968/IMG_0098_-_Square_1_ic22s6.png",
    linkedIn: "https://www.linkedin.com/in/lakshaydahiya77/",
    github: "https://github.com/LakshayDahiya77",
    instagram: "https://www.instagram.com/lkd.in.pixels",
  },
  {
    name: "Nitin Walia",
    role: " Developer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744639/1000174714-removebg-preview_rfkehx.png",
    linkedIn:
      "https://www.linkedin.com/in/nitin-walia-511222304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/walianitin",
    instagram: "https://www.instagram.com/walianitin",
  },
  {
    name: "Prakhar Singh Parmar",
    role: " Developer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744067/Prakhar_Event_head_vbqzoi.jpg",
    linkedIn: "https://www.linkedin.com/in/prakhar-rajput-31a389191",
    github: "https://github.com/PrakharSingh42",
    instagram: "https://www.instagram.com/prakhar6165",
  },
  {
    name: "Tanish Sharma",
    role: "Developer ",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744034/IMG_20251029_172047_gzuquh.jpg",
    linkedIn: "https://www.linkedin.com/in/tanish-sharma-8b3243250",
    github: "https://github.com/tanishsh003",
    instagram: "https://www.instagram.com/tanish_editz._?",
  },
  {
    name: "Piyush Mishra",
    role: "Developer ",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761735860/DSC_0832_1_-_PIYUSH_MISHRA_gzwcib.jpg",
    linkedIn: "",
    github: "https://www.linkedin.com/in/nitin-walia-511222304",
    instagram: "",
  },
  {
    name: "Deepanshu",
    role: "Developer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744028/DSC_1285_qbensa.jpg",
    linkedIn: "https://www.instagram.com/its_d_eep21/",
    github: "http://github.com/Deep-2108",
    instagram: "https://www.instagram.com/its_d_eep21/",
  },
  {
    name: "Harsh Sharma",
    role: "UI/UX designer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744002/Screenshot_2025-10-29_184735_swbiwz.png",
    linkedIn: "https://www.linkedin.com/in/harsh-raj-25741a249/",
    github: "#",
    instagram: "https://www.instagram.com/__harsh._sharma._/",
  },
  {
    name: "Khalid",
    role: "Developer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744036/6EDEFDD5-8EEE-4A70-9A1F-A45AEFF5DCC4_htmspl.png",
    linkedIn: "https://www.linkedin.com/in/khalidahmad25/",
    github: "https://github.com/khalidking2018",
    instagram: "https://www.instagram.com/",
  },
  {
    name: "Sandhya Rani",
    role: "Developer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744039/20250226_155632_jlpp7l.jpg",
    linkedIn: "https://www.linkedin.com/in/sandhya-rani-jam",
    github: "https://github.com/Sandhya-jam",
    instagram: "https://www.instagram.com/sandhya_jam",
  },
  {
    name: "Aayush Kashyap",
    role: "UI/UX Designer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744029/formal-pic_m4qhsq.png",
    linkedIn: "https://www.linkedin.com/in/aayushkashyap617/",
    github: "https://github.com/Aayush1904Kashyap",
    instagram: "https://www.instagram.com/aayush._.kashyap",
  },
  {
    name: "Dushyant",
    role: "UI/UX Designer",
    img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761744933/IMG-20250907-WA0163_t0bwik.jpg",
    linkedIn: "https://www.linkedin.com/in/dushyant107",
    github: "#",
    instagram: "https://www.instagram.com/dushyant.107",
  },
];

export default function TeamSection() {
  return (
    <div className="relative max-w-[100vw] overflow-x-hidden text-gray-200">
      <div
        className={`${contentContainerClass} section-content flex flex-col items-center text-center`}
      >
        <h1 className="section-heading text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          DEVELOPERS
        </h1>

        <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className={`w-full max-w-xs mx-auto ${cardOuterRadiusClass} ${cardSurfaceClasses} ${cardGlassBackground} p-4 transition hover:border-sky-400/50 hover:bg-white/10 sm:p-6`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <div className="flex justify-center">
                <Image
                  src={member.img}
                  width={130}
                  height={130}
                  alt={member.name}
                  className="h-28 w-28 rounded-full object-cover ring-2 ring-gray-700 sm:h-[140px] sm:w-[140px]"
                />
              </div>

              <h3 className="mt-3 text-lg font-semibold sm:mt-4 sm:text-xl">
                {member.name}
              </h3>
              <p className="text-xs text-gray-400 sm:text-sm">{member.role}</p>

              <div className="mt-3 flex justify-center gap-3 text-base text-gray-400 sm:mt-4 sm:gap-4 sm:text-lg">
                <a
                  href={member.linkedIn}
                  aria-label="LinkedIn profile"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Social Media Logos/Linkedin.png"
                    alt="LinkedIn"
                    width={28}
                    height={28}
                    className="object-contain dev-social-icon"
                  />
                </a>

                <a
                  href={member.github}
                  aria-label="GitHub profile"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Social Media Logos/GitHub.png"
                    alt="GitHub"
                    width={28}
                    height={28}
                    className="object-contain dev-social-icon"
                  />
                </a>

                <a
                  href={member.instagram}
                  aria-label="Instagram profile"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/Social Media Logos/instagram.png"
                    alt="Instagram"
                    width={28}
                    height={28}
                    className="object-contain dev-social-icon"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
