"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { clsx } from "clsx";

interface ScrollObserverContextType {
  registerTrigger: (id: string, ref: React.RefObject<HTMLElement>) => void;
  unregisterTrigger: (id: string) => void;
  activeTrigger: string | null;
  activeIndex: number | null;
  isHidden: boolean;
}

const ScrollObserverContext = createContext<ScrollObserverContextType | null>(
  null
);

export function ScrollObserver({
  children,
  className,
}: {
  children: (props: { isHidden: boolean }) => React.ReactNode;
  className?: string;
}) {
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const triggers = useRef<Map<string, React.RefObject<HTMLElement>>>(new Map());

  const registerTrigger = (id: string, ref: React.RefObject<HTMLElement>) => {
    console.log("Registering trigger:", id);
    triggers.current.set(id, ref);
  };

  const unregisterTrigger = (id: string) => {
    triggers.current.delete(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.5;

      setIsHidden(scrollY > threshold);

      let newActiveTrigger: string | null = null;
      let minDistance = Infinity;

      console.log("Scroll detected, triggers count:", triggers.current.size);
      console.log(
        "Available trigger IDs:",
        Array.from(triggers.current.keys())
      );

      triggers.current.forEach((ref, id) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top - threshold);
          console.log(
            `Trigger ${id}: rect.top=${
              rect.top
            }, threshold=${threshold}, distance=${distance}, in range=${
              rect.top <= threshold + 200
            }`
          );
          if (distance < minDistance && rect.top <= threshold + 200) {
            minDistance = distance;
            newActiveTrigger = id;
          }
        }
      });
      console.log("Selected active trigger:", newActiveTrigger);
      setActiveTrigger(newActiveTrigger);

      // Set active index based on trigger id
      if (newActiveTrigger) {
        const indexMatch = newActiveTrigger.match(/features-(\d+)/);
        if (indexMatch) {
          const newIndex = parseInt(indexMatch[1]);
          console.log("Setting active index to:", newIndex);
          setActiveIndex(newIndex);
        }
      } else {
        console.log("No active trigger, setting index to null");
        setActiveIndex(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollObserverContext.Provider
      value={{
        registerTrigger,
        unregisterTrigger,
        activeTrigger,
        activeIndex,
        isHidden,
      }}
    >
      <div className={className}>{children({ isHidden })}</div>
    </ScrollObserverContext.Provider>
  );
}

function useScrollObserver() {
  const context = useContext(ScrollObserverContext);
  if (!context) {
    throw new Error("useScrollObserver must be used within a ScrollObserver");
  }
  return context;
}

ScrollObserver.Trigger = function Trigger({
  id,
  children,
  className,
}: {
  id: string;
  children: (props: { isActive: boolean }) => React.ReactNode;
  className?: string;
}) {
  const { registerTrigger, unregisterTrigger, activeTrigger } =
    useScrollObserver();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerTrigger(id, ref);
    return () => unregisterTrigger(id);
  }, [id, registerTrigger, unregisterTrigger]);

  const isActive = activeTrigger === id;

  return (
    <div ref={ref} className={className}>
      {children({ isActive })}
    </div>
  );
};

ScrollObserver.TriggerGroup = function TriggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
};

ScrollObserver.Reactor = function Reactor({
  children,
  className,
  index,
}: {
  children: (props: { isActive: boolean }) => React.ReactNode;
  className?: string;
  index: number;
}) {
  const { activeIndex } = useScrollObserver();
  const ref = useRef<HTMLDivElement>(null);

  const isActive = activeIndex === index;

  return (
    <div ref={ref} className={className}>
      {children({ isActive })}
    </div>
  );
};

ScrollObserver.ReactorGroup = function ReactorGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
};
