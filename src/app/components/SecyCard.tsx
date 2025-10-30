"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { cardOuterRadiusClass, cardSurfaceClasses } from "./cardTokens";

interface SecyCardProps {
  name: string;
  role: string;
  desc: string;
  img: string;
  index?: number;
}

export default function SecyCard({
  name,
  role,
  desc,
  img,
  index = 0,
}: SecyCardProps) {
  return (
    <motion.div
      className="group relative h-72 w-full cursor-pointer [perspective:1000px] sm:h-80 sm:w-64"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <div className="relative w-full h-full transition-transform duration-1500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div
          className={`absolute h-full w-full overflow-hidden ${cardOuterRadiusClass} [backface-visibility:hidden] shadow-xl`}
        >
          <Image src={img} alt={name} fill className="object-cover" />
        </div>

        {/* Back */}
        <div
          className={`absolute flex h-full w-full flex-col items-center justify-center bg-gray-900 p-4 text-white sm:p-6 ${cardOuterRadiusClass} ${cardSurfaceClasses} [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl`}
        >
          <h2 className="font-semibold text-lg mb-1 sm:text-xl">{name}</h2>
          <p className="text-xs opacity-80 sm:text-sm">{role}</p>
          <p className="text-xs opacity-70 mt-2 sm:text-sm">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
