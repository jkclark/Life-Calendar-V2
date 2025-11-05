import type React from "react";
import { useState } from "react";
import CreateCalendarModal from "./CreateCalendarModal";
import ImportCalendarModal from "./ImportCalendarModal";

type ViewState = "selection" | "create" | "import";

const NewOrImport: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>("selection");

  const handleNewClick = () => {
    setCurrentView("create");
  };

  const handleImportClick = () => {
    setCurrentView("import");
  };

  const handleBackClick = () => {
    setCurrentView("selection");
  };

  let elementToShow = null;

  if (currentView === "selection") {
    elementToShow = (
      <SelectView
        onNewClick={handleNewClick}
        onImportClick={handleImportClick}
      />
    );
  } else if (currentView === "create") {
    elementToShow = <CreateCalendarModal />;
  } else if (currentView === "import") {
    elementToShow = <ImportCalendarModal />;
  }

  if (elementToShow) {
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
          {elementToShow}
        </div>
      </div>
    );
  }
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

export default NewOrImport;
