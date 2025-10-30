import Image from "next/image";
import { motion } from "framer-motion";
import {
  CARD_INNER_RADIUS_PX,
  CARD_OUTER_RADIUS_PX,
  CARD_PADDING_PX,
  cardGlassBackground,
  cardInnerRadiusClass,
  cardSurfaceClasses,
} from "./cardTokens";

interface inputProps {
  title: string;
  content: string;
  image: string;
  vector: string;
  day: string;
}

export default function Card(props: inputProps) {
  const outerRadiusPx = CARD_OUTER_RADIUS_PX;
  const innerRadiusPx = CARD_INNER_RADIUS_PX;
  const tileOuterStyle = {
    borderRadius: `${outerRadiusPx}px`,
    padding: `${CARD_PADDING_PX}px`,
  } as const;
  const tileInnerStyle = {
    borderRadius: `${innerRadiusPx}px`,
  } as const;

  return (
    <motion.div
      className="flex w-full max-w-6xl flex-col gap-6 sm:gap-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <div className="grid gap-4 sm:gap-6 md:grid-cols-[minmax(220px,380px)_minmax(500px,1fr)]">
        <motion.div
          className="flex flex-col gap-4 sm:gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          {/* Day + Title Box - Two lines with Day on top */}
          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`relative flex h-32 flex-col items-center justify-center overflow-hidden bg-black/40 sm:h-40 ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              <Image
                src={props.image}
                alt={props.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative z-10 flex flex-col items-center justify-center gap-1 px-4 sm:gap-2 sm:px-6">
                <span className="text-xs font-medium uppercase tracking-wider text-white/80 drop-shadow-lg sm:text-sm">
                  {props.day}
                </span>
                <span className="text-lg font-bold uppercase tracking-wide text-white drop-shadow-lg sm:text-2xl">
                  {props.title}
                </span>
              </div>
            </div>
          </article>

          {/* Description Box */}
          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} flex-1 p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`flex h-full w-full items-center justify-center bg-black/30 px-3 py-4 text-center text-sm text-white/90 sm:px-4 sm:text-base ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              {props.content}
            </div>
          </article>
        </motion.div>

        {/* Large Image Box - Optimized for 3:2 ratio horizontal images */}
        <motion.article
          className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
          style={tileOuterStyle}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <div
            className={`relative w-full overflow-hidden ${cardInnerRadiusClass}`}
            style={{
              ...tileInnerStyle,
              aspectRatio: "3 / 2",
              minHeight: "300px",
              maxHeight: "600px",
            }}
          >
            <Image
              src={props.image}
              alt={props.image || props.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1536px) 70vw, 1000px"
            />
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
