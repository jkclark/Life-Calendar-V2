import type { Calendar } from "@life-calendar/common";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import CreateCalendar from "./CreateCalendar";
import ImportCalendarModal from "./ImportCalendarModal";

type ViewState = "selection" | "create" | "import";

interface CreateOrImportProps {
  setCurrentCalendar: (calendar: Calendar | null) => void;
}

const CreateOrImport: React.FC<CreateOrImportProps> = ({
  setCurrentCalendar,
}) => {
  const [currentView, setCurrentView] = useState<ViewState>("selection");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [hasNavigatedAway, setHasNavigatedAway] = useState(false);

  // Animation variants for selection view
  const getSelectionVariants = (
    isGoingForward: boolean,
    isFirstRender: boolean,
  ) => {
    if (isFirstRender) {
      // No animation on first render
      return {
        initial: {
          opacity: 1,
          x: 0,
          scale: 1,
        },
        in: {
          opacity: 1,
          x: 0,
          scale: 1,
        },
        out: {
          opacity: 0,
          x: isGoingForward ? -100 : -100, // Exit left when going forward to modals
          scale: 1,
        },
      };
    }

    // Normal animation when returning from other views
    return {
      initial: {
        opacity: 0,
        x: isGoingForward ? -100 : -100, // Always enter from left when returning to selection
        scale: 0.95,
      },
      in: {
        opacity: 1,
        x: 0,
        scale: 1,
      },
      out: {
        opacity: 0,
        x: isGoingForward ? -100 : -100, // Exit left when going forward to modals
        scale: 1,
      },
    };
  };

  // Animation variants for modal views (create/import)
  const getModalVariants = (isGoingForward: boolean) => ({
    initial: {
      opacity: 0,
      x: isGoingForward ? 100 : 100, // Always enter from right when going to modals
      scale: 0.95,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: isGoingForward ? 100 : 100, // Exit right when going back to selection
      scale: 1,
    },
  });

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.4,
  };

  const handleNewClick = () => {
    setDirection("forward");
    setHasNavigatedAway(true);
    setCurrentView("create");
  };

  const handleImportClick = () => {
    setDirection("forward");
    setHasNavigatedAway(true);
    setCurrentView("import");
  };

  const handleBackClick = () => {
    setDirection("backward");
    setCurrentView("selection");
  };

  return (
    <div className="flex aspect-square w-[80%] max-w-[800px] flex-col items-center justify-center">
      <div
        className={`items-left justify-left flex w-full ${currentView === "selection" ? "invisible" : ""}`}
      >
        <button className="btn" onClick={handleBackClick}>
          Back
        </button>
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {currentView === "selection" && (
            <motion.div
              key="selection"
              initial="initial"
              animate="in"
              exit="out"
              variants={getSelectionVariants(
                direction === "forward",
                !hasNavigatedAway,
              )}
              transition={pageTransition}
              className="w-full"
            >
              <SelectView
                onNewClick={handleNewClick}
                onImportClick={handleImportClick}
              />
            </motion.div>
          )}
          {currentView === "create" && (
            <motion.div
              key="create"
              initial="initial"
              animate="in"
              exit="out"
              variants={getModalVariants(direction === "forward")}
              transition={pageTransition}
              className="w-full"
            >
              <CreateCalendar setCurrentCalendar={setCurrentCalendar} />
            </motion.div>
          )}
          {currentView === "import" && (
            <motion.div
              key="import"
              initial="initial"
              animate="in"
              exit="out"
              variants={getModalVariants(direction === "forward")}
              transition={pageTransition}
              className="w-full"
            >
              <ImportCalendarModal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SelectView: React.FC<SelectViewProps> = ({
  onNewClick,
  onImportClick,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <button
        className="btn w-[50%] py-20 text-lg md:text-2xl"
        onClick={onNewClick}
      >
        Create a new calendar
      </button>
      <div className="my-5 flex w-[80%] items-center text-xl md:my-10">
        <hr className="border-base-300 w-full flex-1 border-2" />
        <div className="w-15 text-center">or</div>
        <hr className="border-base-300 w-full flex-1 border-2" />
      </div>
      <button
        className="btn w-[50%] py-20 text-lg md:text-2xl"
        onClick={onImportClick}
      >
        Import an existing calendar
      </button>
    </div>
  );
};

interface SelectViewProps {
  onNewClick: () => void;
  onImportClick: () => void;
}

export default CreateOrImport;
