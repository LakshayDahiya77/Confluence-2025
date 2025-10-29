import Image from "next/image";
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
    <div className="flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-[minmax(180px,1fr)_minmax(300px,1.6fr)_minmax(180px,1fr)]">
        <div className="flex flex-col gap-4 sm:gap-6">
          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`relative flex h-24 items-center justify-center overflow-hidden bg-black/40 sm:h-32 ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              <Image
                src={props.image}
                alt={props.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <span className="relative z-10 px-4 text-sm font-semibold uppercase tracking-wide text-white drop-shadow-lg sm:px-6 sm:text-lg">
                {props.title}
              </span>
            </div>
          </article>

          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} flex-1 p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`flex h-full w-full items-center justify-center bg-black/30 px-3 text-center text-sm text-white/90 sm:px-4 sm:text-base ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              {props.content}
            </div>
          </article>
        </div>

        <article
          className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
          style={tileOuterStyle}
        >
          <div
            className={`relative h-64 w-full overflow-hidden sm:h-80 md:h-[360px] ${cardInnerRadiusClass}`}
            style={tileInnerStyle}
          >
            <Image
              src={props.image}
              alt={props.image || props.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </article>

        <div className="flex flex-col gap-4 sm:gap-6">
          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`relative flex h-24 items-center justify-center overflow-hidden bg-black/40 sm:h-32 ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              <Image
                src="https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761599547/77928372_SL-072622-51930-16_pjvags.jpg"
                alt={`${props.day} background`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <span className="relative z-10 px-3 text-sm font-semibold uppercase tracking-wide text-white drop-shadow sm:px-4 sm:text-lg">
                {props.day}
              </span>
            </div>
          </article>

          <article
            className={`${cardSurfaceClasses} ${cardGlassBackground} flex-1 p-2`}
            style={tileOuterStyle}
          >
            <div
              className={`relative flex h-full w-full flex-col overflow-hidden ${cardInnerRadiusClass}`}
              style={tileInnerStyle}
            >
              <div className="relative h-24 w-full overflow-hidden sm:h-32">
                <Image
                  src={props.vector}
                  alt={`${props.vector} artwork`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 items-center justify-center px-3 py-4 text-center text-sm text-white sm:px-4 sm:py-6 sm:text-base">
                {/* {props.vector} */}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
