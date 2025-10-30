"use client";

import {
  type CSSProperties,
  useEffect,
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the Galaxy/WebGL component on the client only.
// "ogl" and WebGL-related code can throw during server-side evaluation or
// Fast Refresh; dynamic import with ssr: false ensures the module is only
// required in the browser runtime.
const Galaxy = dynamic(() => import("../components/Galaxy"), {
  ssr: false,
});

// ===== GALAXY ANIMATION CONFIGURATION =====
// Adjust these values to customize the galaxy background animation
const GALAXY_CONFIG = {
  // Star movement speed (0 = static, higher = faster)
  starSpeed: 0.5,

  // Star density (0.5 = sparse, 2 = dense)
  density: 1.5,

  // Color hue shift in degrees (0-360)
  // 0 = red, 120 = green, 240 = blue, 140 = cyan-ish
  hueShift: 180,

  // Animation speed multiplier
  speed: 0.2,

  // Star glow intensity (0 = no glow, 1 = maximum glow)
  glowIntensity: 0.6,

  // Color saturation (0 = grayscale, 1 = full color)
  saturation: 0.8,

  // Enable mouse repulsion effect (stars push away from cursor)
  mouseRepulsion: false,

  // Mouse interaction enabled
  mouseInteraction: true,

  // Star twinkle intensity (0 = no twinkle, 1 = maximum)
  twinkleIntensity: 0.3,

  // Galaxy rotation speed (0 = no rotation)
  rotationSpeed: 0,

  // Repulsion strength when mouseRepulsion is true
  repulsionStrength: 2,

  // Auto center repulsion (0 = disabled, pushes stars from center)
  autoCenterRepulsion: 0,

  // Transparent background (allows wallpaper to show through)
  transparent: true,

  // === FADE EFFECT CONFIGURATION ===
  // Bottom fade for smooth transition
  fade: {
    enabled: false,
    startPosition: "0vh",
    intensity: 0,
    type: "linear" as const,
  },
};

// Layout configuration for landing page dimensions
const LAYOUT_CONFIG = {
  // Landing page section height (viewport height units)
  sectionHeight: "100vh",

  // Animation background height (covers full landing page)
  animationHeight: "100vh",

  // Animation width
  animationWidth: "100vw",

  // Animation position type
  animationPosition: "fixed" as const,

  // === BACKGROUND IMAGE CONFIGURATION ===
  // Background image that appears after stars
  backgroundImage: {
    // Enable background image layer
    enabled: true,

    // Path to background image (relative to public folder)
    // Set to empty string "" to disable background image
    url: "",

    // Background image opacity (0 = invisible, 1 = fully visible)
    opacity: 0.3,

    // Background size: "cover" | "contain" | "auto"
    size: "cover" as const,

    // Background position
    position: "center" as const,
  },
};

// ===== FINE-TUNING CONFIGURATION =====
// Adjust these values to customize the intro animation timing and appearance
const INTRO_ANIMATION_CONFIG = {
  // === ANIMATION SEQUENCE TIMING ===
  // After video completes, elements appear in this order:
  // 1. Stars fade in from 0 to full brightness
  // 2. Background image appears
  // 3. Logo holds at full size
  // 4. Logo shrinks to final size

  // Delay before stars start appearing after video ends (milliseconds)
  starsDelay: 0,

  // Duration of stars fade-in animation (milliseconds)
  starsFadeDuration: 1500,

  // Delay before background appears after stars start (milliseconds)
  backgroundDelay: 500,

  // Duration of background fade-in animation (milliseconds)
  backgroundFadeDuration: 1000,

  // Duration logo stays at full width before shrinking (milliseconds)
  logoHoldDuration: 0,

  // Duration of logo shrinking animation (milliseconds)
  logoShrinkDuration: 2000,

  // Duration video is visible before transitioning to audio-only (milliseconds)
  videoVisibleDuration: 15000, // 15 seconds - after this, video fades out but audio continues

  // Fallback timeout if video doesn't load/play (milliseconds)
  videoTimeout: 20000, // 20 seconds

  // === LOGO SIZES ===
  // Initial logo width (full screen)
  logoInitialWidth: "120vw",

  // Final logo width on MOBILE (after shrinking)
  logoFinalWidthMobile: "70vw", // 80% of viewport width

  // Final logo width on DESKTOP (after shrinking)
  logoFinalWidthDesktop: "50vw", // 70% of viewport width

  // === ANIMATION EFFECTS ===
  // Animation easing curve for logo shrink
  // Options: "linear", "easeIn", "easeOut", "easeInOut", "circIn", "circOut",
  // "circInOut", "backIn", "backOut", "backInOut", "anticipate"
  /* easeOut – quick start, smooth settle, no overshoot.
easeInOut – gentle acceleration and deceleration.
easeIn – slow start, speeds up toward the end.
linear – constant speed (can feel robotic).
circOut – similar to easeOut but slightly softer.
anticipate / backOut / backInOut – add a bounce; avoid if you don’t want it. */
  shrinkEasing: "easeOut" as const, // Subtle bounce/overshoot effect

  // Scale animation during shrink (1 = no scale)
  // Creates zoom effect independent of width change
  scaleAnimation: {
    enabled: false,
    initial: 1,
    final: 1,
  },

  // Rotation animation during shrink (degrees)
  rotationAnimation: {
    enabled: false,
    degrees: 0, // Try small values like 2 or -2 for subtle tilt
  },

  // === VERTICAL OFFSET ===
  // Vertical offset from center (positive = down, negative = up)
  // Can use px, vh, or % units
  verticalOffset: "0vh", // No offset by default (perfectly centered)

  // Example values to try:
  // "5vh"    - move 5% of viewport down
  // "-10vh"  - move 10% of viewport up
  // "50px"   - move 50 pixels down
  // "-3%"    - move 3% up
};

const LandingPage = forwardRef<{ triggerPlayback: () => void }>(
  (props, ref) => {
    const [videoComplete, setVideoComplete] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [logoShrinking, setLogoShrinking] = useState(false);
    const [showStars, setShowStars] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [, setIntroComplete] = useState(false); // True when both video and audio complete (we only need the setter)

    const handleVideoTransition = useCallback(() => {
      // Sequence 1: Show stars immediately when video fades
      setShowStars(true);

      // Sequence 2: Show background after delay
      setTimeout(() => {
        setShowBackground(true);
      }, INTRO_ANIMATION_CONFIG.backgroundDelay);

      // Sequence 3: Show logo at full size
      setTimeout(() => {
        setShowLogo(true);
      }, INTRO_ANIMATION_CONFIG.backgroundDelay);

      // Sequence 4: Start shrinking logo after hold duration
      setTimeout(() => {
        setLogoShrinking(true);

        // Dispatch event to show navbar when logo starts shrinking
        setTimeout(() => {
          window.dispatchEvent(new Event("introComplete"));
        }, 500); // Small delay after logo starts shrinking
      }, INTRO_ANIMATION_CONFIG.backgroundDelay + INTRO_ANIMATION_CONFIG.logoHoldDuration);
    }, []);

    const handleVideoEnd = useCallback(() => {
      console.log(
        "Video ended (13s), starting animation, audio continues for 20 more seconds"
      );
      setVideoComplete(true);

      // Start animation sequence immediately when video ends
      handleVideoTransition();
    }, [handleVideoTransition]);

    const handleVideoComplete = useCallback(() => {
      console.log("Video playback timeout or error");
      setVideoComplete(true);
      handleVideoTransition();
    }, [handleVideoTransition]);

    const startPlayback = useCallback(async () => {
      if (!videoRef.current || !audioRef.current) return;

      try {
        setVideoError(false);

        // Reset both to start
        videoRef.current.currentTime = 0;
        audioRef.current.currentTime = 0;

        // Ensure video stays muted for autoplay compliance
        videoRef.current.muted = true;

        const videoPlayPromise = videoRef.current.play();
        const audioPlayPromise = audioRef.current.play();

        await Promise.all([videoPlayPromise, audioPlayPromise]);
        console.log("Video and audio both playing");
      } catch (error) {
        console.error("Playback failed:", error);
        setVideoError(true);
        handleVideoComplete();
      }
    }, [handleVideoComplete]);

    // Expose triggerPlayback method for parent component
    useImperativeHandle(
      ref,
      () => ({
        triggerPlayback: () => {
          void startPlayback();
        },
      }),
      [startPlayback]
    );

    // Detect mobile viewport
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Force scroll to top on mount and prevent scroll restoration
    useEffect(() => {
      // Disable browser scroll restoration
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      // Force immediate scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, []);

    // Generate fade gradient based on configuration
    const getFadeGradient = () => {
      if (!GALAXY_CONFIG.fade.enabled) return "none";

      const startPos = GALAXY_CONFIG.fade.startPosition;
      const type = GALAXY_CONFIG.fade.type;

      // Different gradient types for fade effect
      const gradients = {
        linear: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${startPos}), rgba(0,0,0,0) 100%)`,
        easeIn: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${startPos}), rgba(0,0,0,0.5) calc(100% - calc(${startPos} / 2)), rgba(0,0,0,0) 100%)`,
        easeOut: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${startPos}), rgba(0,0,0,0.3) calc(100% - calc(${startPos} * 0.7)), rgba(0,0,0,0) 100%)`,
        smooth: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${startPos}), rgba(0,0,0,0.8) calc(100% - calc(${startPos} * 0.8)), rgba(0,0,0,0.5) calc(100% - calc(${startPos} * 0.5)), rgba(0,0,0,0.2) calc(100% - calc(${startPos} * 0.3)), rgba(0,0,0,0) 100%)`,
      };

      return gradients[type] || gradients.easeOut;
    };

    const baseBackgroundStyle: CSSProperties = {
      position: LAYOUT_CONFIG.animationPosition,
      top: 0,
      left: 0,
      height: LAYOUT_CONFIG.animationHeight,
      width: LAYOUT_CONFIG.animationWidth,
      overflow: "hidden",
      ...(GALAXY_CONFIG.fade.enabled && {
        maskImage: getFadeGradient(),
        WebkitMaskImage: getFadeGradient(),
      }),
    };

    // Lock scroll until logo finishes shrinking
    useEffect(() => {
      if (!videoComplete || !logoShrinking) {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        // Continuously reset scroll position to top during animation
        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollTo(0, 0);
          }
        }, 16); // Check every frame (~60fps)

        return () => {
          clearInterval(scrollInterval);
        };
      } else {
        // Re-enable scrolling when logo starts shrinking
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }, [videoComplete, logoShrinking]);

    // Fallback timeout in case video doesn't load/play
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (!videoComplete) {
          handleVideoComplete();
        }
      }, INTRO_ANIMATION_CONFIG.videoTimeout);

      return () => clearTimeout(timeout);
    }, [videoComplete, handleVideoComplete]);

    return (
      <div
        className="relative w-full max-w-[100vw] overflow-x-hidden overflow-y-hidden"
        style={{ minHeight: LAYOUT_CONFIG.sectionHeight }}
      >
        {/* Fixed galaxy stars animation with custom fade-in */}
        <AnimatePresence>
          {showStars && (
            <motion.div
              className="fixed top-0 left-0 z-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: INTRO_ANIMATION_CONFIG.starsFadeDuration / 1000,
                ease: "easeOut",
              }}
              style={baseBackgroundStyle}
            >
              <Galaxy
                starSpeed={GALAXY_CONFIG.starSpeed}
                density={GALAXY_CONFIG.density}
                hueShift={GALAXY_CONFIG.hueShift}
                speed={GALAXY_CONFIG.speed}
                glowIntensity={GALAXY_CONFIG.glowIntensity}
                saturation={GALAXY_CONFIG.saturation}
                mouseRepulsion={GALAXY_CONFIG.mouseRepulsion}
                mouseInteraction={GALAXY_CONFIG.mouseInteraction}
                twinkleIntensity={GALAXY_CONFIG.twinkleIntensity}
                rotationSpeed={GALAXY_CONFIG.rotationSpeed}
                repulsionStrength={GALAXY_CONFIG.repulsionStrength}
                autoCenterRepulsion={GALAXY_CONFIG.autoCenterRepulsion}
                transparent={GALAXY_CONFIG.transparent}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background image layer (appears after stars) */}
        <AnimatePresence>
          {showBackground &&
            LAYOUT_CONFIG.backgroundImage.enabled &&
            LAYOUT_CONFIG.backgroundImage.url && (
              <motion.div
                className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: LAYOUT_CONFIG.backgroundImage.opacity }}
                exit={{ opacity: 0 }}
                transition={{
                  duration:
                    INTRO_ANIMATION_CONFIG.backgroundFadeDuration / 1000,
                  ease: "easeOut",
                }}
                style={{
                  backgroundImage: `url("${LAYOUT_CONFIG.backgroundImage.url}")`,
                  backgroundSize: LAYOUT_CONFIG.backgroundImage.size,
                  backgroundPosition: LAYOUT_CONFIG.backgroundImage.position,
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
        </AnimatePresence>

        {/* Container for centering logo */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateY(${INTRO_ANIMATION_CONFIG.verticalOffset})`,
          }}
        >
          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="absolute z-10 flex items-center justify-center"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="relative flex items-center justify-center"
                  style={{ maxWidth: "100%" }}
                  initial={{
                    width: INTRO_ANIMATION_CONFIG.logoInitialWidth,
                    scale: INTRO_ANIMATION_CONFIG.scaleAnimation.enabled
                      ? INTRO_ANIMATION_CONFIG.scaleAnimation.initial
                      : 1,
                    rotate: INTRO_ANIMATION_CONFIG.rotationAnimation.enabled
                      ? 0
                      : 0,
                  }}
                  animate={{
                    width: logoShrinking
                      ? isMobile
                        ? INTRO_ANIMATION_CONFIG.logoFinalWidthMobile
                        : INTRO_ANIMATION_CONFIG.logoFinalWidthDesktop
                      : INTRO_ANIMATION_CONFIG.logoInitialWidth,
                    scale:
                      logoShrinking &&
                      INTRO_ANIMATION_CONFIG.scaleAnimation.enabled
                        ? INTRO_ANIMATION_CONFIG.scaleAnimation.final
                        : INTRO_ANIMATION_CONFIG.scaleAnimation.initial,
                    rotate:
                      logoShrinking &&
                      INTRO_ANIMATION_CONFIG.rotationAnimation.enabled
                        ? INTRO_ANIMATION_CONFIG.rotationAnimation.degrees
                        : 0,
                  }}
                  transition={{
                    duration: logoShrinking
                      ? INTRO_ANIMATION_CONFIG.logoShrinkDuration / 1000
                      : 0,
                    ease: INTRO_ANIMATION_CONFIG.shrinkEasing,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Conflu_Spinning_wheel_logo.svg"
                    alt="Confluence 2025"
                    className="max-w-full h-auto object-contain"
                    style={{ display: "block" }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hidden audio element that plays simultaneously with video and continues after */}
        <audio
          ref={audioRef}
          src="/Full_Audio.m4a"
          preload="auto"
          onEnded={() => {
            console.log("Audio completed (33s)");
            setIntroComplete(true);
          }}
          onError={(e) => {
            console.error("Audio loading failed:", e);
            setIntroComplete(true);
          }}
        />

        {!videoComplete && (
          <div className="fixed inset-0 z-50 bg-black">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/Video_No_Audio.mp4"
              muted
              playsInline
              preload="auto"
              webkit-playsinline="true"
              x5-playsinline="true"
              onEnded={handleVideoEnd}
              onError={(e) => {
                console.error("Video error event:", e);
                setVideoError(true);
                handleVideoComplete();
              }}
              onLoadedData={() => {
                console.log("Video loaded successfully");
              }}
              onCanPlay={() => {
                console.log("Video can play");
              }}
            >
              <source src="/Video_No_Audio.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                Loading...
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

LandingPage.displayName = "LandingPage";

export default LandingPage;
