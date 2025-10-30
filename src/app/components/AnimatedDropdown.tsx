"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { glassElement, glassPanel } from "./glassTokens";

export type AnimatedDropdownItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: string;
};

interface AnimatedDropdownProps {
  items: AnimatedDropdownItem[];
  selectedId?: string;
  onSelect: (item: AnimatedDropdownItem) => void;
  placeholder?: string;
  className?: string;
}

export default function AnimatedDropdown({
  items,
  selectedId,
  onSelect,
  placeholder = "Select",
  className = "",
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleItemSelect = (item: AnimatedDropdownItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <div ref={dropdownRef} className={`relative inline-flex ${className}`}>
        <button
          type="button"
          onClick={toggleDropdown}
          className={`group flex w-full items-center justify-between gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-0 hover:bg-white/15 ${glassElement} ${isOpen ? "opacity-0" : "opacity-100"}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="truncate">
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10"
          >
            <ChevronDown className="h-4 w-4" aria-hidden />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
              transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
              style={{
                transformOrigin: "top",
              }}
              className={`absolute left-0 right-0 z-40 mt-1.5 origin-top overflow-hidden rounded-3xl p-2 ${glassPanel}`}
            >
              <ul
                className="dropdown-scroll flex max-h-64 flex-col overflow-y-auto overflow-x-hidden pr-1"
                role="listbox"
                aria-activedescendant={selectedItem?.id}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {items.map((item) => {
                  const isSelected = selectedItem?.id === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 26,
                      }}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleItemSelect(item)}
                      className={`flex cursor-pointer items-center gap-2 rounded-2xl px-4 py-2 text-sm transition-colors ${
                        isSelected
                          ? "bg-sky-500/20 text-white"
                          : "text-slate-100 hover:bg-white/10"
                      }`}
                    >
                      {item.icon && (
                        <span className="text-base">{item.icon}</span>
                      )}
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.description && !isSelected && (
                        <span className="text-xs text-slate-400">
                          {item.description}
                        </span>
                      )}
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 20,
                          }}
                          className="ml-auto inline-flex h-4 w-4 items-center justify-center rounded-full border border-sky-300/60 bg-sky-400/20"
                        >
                          <svg
                            className="h-3 w-3 text-sky-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.span>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        .dropdown-scroll {
          /* Show default scrollbar */
          scrollbar-width: auto;
        }
        .dropdown-scroll::-webkit-scrollbar {
          display: block;
        }
      `}</style>
    </>
  );
}
