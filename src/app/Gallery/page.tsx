"use client";
import { useRef } from "react";
import Card from "../components/GalleryCard";
import { contentContainerClass } from "../components/layoutTokens";
import Pagination, { usePagination } from "../components/Pagination";

const data = [
  {
    title: "Kavyanjali",
    content: "काव्यांजलि (एक शाम प्रेम, हास्य और ग़ज़लों के नाम), एक ऐसी शाम जहाँ हर एहसास लफ़्ज़ों में बयाँ होता है, जहाँ हर जुबां पर सिर्फ़ वाह होता है। यहाँ शिरकत करने आते हैं देश के विख्यात कवि/कवयित्री और उनको सुनने के लिए मौजूद होती है, उत्साह और जोश से भरी हज़ारों की भीड़।",
    image: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761594924/DSC_5230_ibstci.jpg",
    day: "day1",
    vector: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718218/4792328_2472781_qnywmc.jpg",
  },
  {
    title: "Libaas",
    content: "Step into the world of fashion at Confluence's Libaas! Models will grace the runway, showcasing a blend of creative costumes and stylish outfits in a mesmerizing fashion show.",
    image: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761594914/DSC_3939_reizpc.jpg",
    day: "day1",
    vector: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718217/14571759_5490039_w44plo.jpg",
  },
  {
    title: "Groove Armada",
    content: "Feel the beat at Confluence's Groove Armada! Dancers will light up the stage with a fusion of styles, from hip-hop to contemporary, battling it out for the ultimate dance crown.",
    image: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761594914/D7500-37_l2clm7.jpg",
    day: "day2",
    vector: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718218/4792328_2472781_qnywmc.jpg",
  },
  {
    title: "Folk Dance",
    content: "The Folk Dance event celebrates the vibrant traditions and cultural diversity of India. Students showcase various regional dance forms like Bhangra, Garba, and Ghoomar, with colorful costumes and energetic performances.",
    image: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761594912/DSC_8757_nn4uat.jpg",
    day: "day2",
    vector: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718226/36102445_2211.w026.n002.2792B.p1.2792_zlvdws.jpg",
  },
  {
    title: "StarNite",
    content: "StarNite is the main event featuring performances by renowned artists, singers, or bands. It is often the grand finale of the festival, drawing large crowds and creating a memorable experience for attendees.",
    image: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761594905/DSC_3761_1_v4ebk8.jpg",
    day: "day4",
    vector: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718226/36472048_2211.w026.n002.2797B.p1.2797_zru3zp.jpg",
  },
 
];
export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pagination: Reads config from CSS variables (--pagination-gallery-mobile/desktop)
  // Gallery uses carousel style (1 item per page)
  const {
    currentItems: paginatedImages,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination(data, "gallery");

  return (
    <div
      ref={sectionRef}
      className="flex w-full max-w-[100vw] items-center justify-center overflow-x-hidden"
    >
      <div
        className={`${contentContainerClass} section-content flex flex-col items-center justify-center`}
      >
        <h1 className="section-heading text-center text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          GALLERY
        </h1>

        {/* Single Card Display */}
        {paginatedImages[0] && (
          <Card
            title={paginatedImages[0].title}
            content={paginatedImages[0].content}
            image={paginatedImages[0].image}
            day={paginatedImages[0].day}
            vector={paginatedImages[0].vector}
          />
        )}

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sectionRef={sectionRef}
          className="mt-8"
        />
      </div>
    </div>
  );
}
