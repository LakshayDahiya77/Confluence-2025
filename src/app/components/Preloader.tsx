"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glassPanel, glassPaginationButton } from "./glassTokens";
import { galleryData } from "../data/galleryData";

interface PreloaderProps {
  onComplete: () => void;
  onEnter?: () => void; // Callback when user clicks Enter button
}

/**
 * Preloader component that loads all critical assets before showing the site
 * Shows a loading bar with progress percentage
 * After loading, shows an "Enter" button to start the experience
 */
export default function Preloader({ onComplete, onEnter }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);

  useEffect(() => {
    // Dynamically extract all gallery images
    const galleryImages = galleryData.flatMap((item) => [
      { url: item.image, type: "image" as const },
      { url: item.vector, type: "image" as const },
    ]);

    // List of all assets to preload
    const assetsToLoad = [
      // Background images
      { url: "/bg-wallpaper.jpg", type: "image" as const },
      { url: "/bg-wallpaper-vertical.jpg", type: "image" as const },

      // Logos
      { url: "/conflu25White.png", type: "image" as const }, // For navbar
      { url: "/Conflu_Spinning_wheel_logo.svg", type: "image" as const }, // For landing page

      // Intro video (no audio)
      { url: "/Video_No_Audio.mp4", type: "video" as const },

      // Full audio track
      { url: "/Full_Audio.m4a", type: "audio" as const },

      // Gallery images (dynamically loaded)
      ...galleryImages,
    ];

    let loadedCount = 0;
    const totalAssets = assetsToLoad.length;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(newProgress);

      if (loadedCount === totalAssets) {
        // Small delay to show 100% completion
        setTimeout(() => {
          setShowEnterButton(true); // Show Enter button instead of auto-closing
        }, 300);
      }
    };

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${url}`);
          updateProgress(); // Still count as loaded to not block
          resolve();
        };
        img.src = url;
      });
    };

    const loadVideo = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.onloadeddata = () => {
          updateProgress();
          resolve();
        };
        video.onerror = () => {
          console.warn(`Failed to load video: ${url}`);
          updateProgress(); // Still count as loaded to not block
          resolve();
        };
        video.preload = "auto";
        video.src = url;
        video.load();
      });
    };

    const loadAudio = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const audio = new Audio();
        audio.onloadeddata = () => {
          updateProgress();
          resolve();
        };
        audio.onerror = () => {
          console.warn(`Failed to load audio: ${url}`);
          updateProgress(); // Still count as loaded to not block
          resolve();
        };
        audio.preload = "auto";
        audio.src = url;
        audio.load();
      });
    };

    // Start loading all assets
    const loadAllAssets = async () => {
      const promises = assetsToLoad.map((asset) => {
        if (asset.type === "image") {
          return loadImage(asset.url);
        } else if (asset.type === "video") {
          return loadVideo(asset.url);
        } else if (asset.type === "audio") {
          return loadAudio(asset.url);
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
    };

    loadAllAssets();
  }, [onComplete]);

  const handleEnterClick = () => {
    setIsComplete(true);
    setTimeout(() => {
      onComplete();
      if (onEnter) {
        onEnter(); // Trigger intro playback
      }
    }, 500); // Exit animation time
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050316]"
        >
          <div className="flex flex-col items-center gap-8 px-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Conflu_Spinning_wheel_logo.svg"
                alt="Confluence Logo"
                className="h-16 w-auto sm:h-20 md:h-24"
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <h2 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                {showEnterButton
                  ? "Enter the Cosmic Carnival"
                  : "Loading Experience"}
              </h2>
              {showEnterButton && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm text-white/70 sm:text-base"
                ></motion.p>
              )}
            </motion.div>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-full max-w-md"
            >
              {!showEnterButton ? (
                <>
                  {/* Progress bar background */}
                  <div
                    className={`relative h-2.5 overflow-hidden rounded-full ${glassPanel}`}
                  >
                    {/* Progress fill */}
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"
                    >
                      {/* Animated shimmer effect */}
                      <motion.div
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>

                  {/* Percentage text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    className="mt-3 text-center text-sm font-medium text-white/80"
                  >
                    {progress}%
                  </motion.div>
                </>
              ) : (
                /* Enter Button - Shows after loading completes */
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onClick={handleEnterClick}
                  className={`w-full max-w-xs px-8 py-4 rounded-full text-lg font-semibold text-white sm:text-xl ${glassPaginationButton}`}
                >
                  Enter
                </motion.button>
              )}
            </motion.div>

            {/* Animated dots - Only show during loading */}
            {!showEnterButton && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="flex gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="h-2 w-2 rounded-full bg-sky-400"
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
