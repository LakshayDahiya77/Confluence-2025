"use client";
import { useRef } from "react";
import Card from "../components/GalleryCard";
import { contentContainerClass } from "../components/layoutTokens";
import Pagination, { usePagination } from "../components/Pagination";
import { galleryData } from "../data/galleryData";

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pagination: Reads config from CSS variables (--pagination-gallery-mobile/desktop)
  // Gallery uses carousel style (1 item per page)
  const {
    currentItems: paginatedImages,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination(galleryData, "gallery");

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
