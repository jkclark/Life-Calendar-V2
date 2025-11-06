import { useState } from "react";

import type { Calendar } from "@life-calendar/common";
import CalendarComponent from "./components/Calendar";
import CreateOrImport from "./components/CreateOrImport";
import Navbar from "./components/Navbar";

function App() {
  const [currentCalendar, setCurrentCalendar] = useState<Calendar | null>(null);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        {!currentCalendar && (
          <CreateOrImport setCurrentCalendar={setCurrentCalendar} />
        )}
        {currentCalendar && (
          <CalendarComponent
            rows={90}
            cols={52}
            className="mx-auto"
            style={{
              height: "min(calc(100vh - 5rem), calc(80vw * 3 / 2))",
              width: "min(80vw, calc((100vh - 4rem) * 2 / 3))",
              maxHeight: "calc(100vh - 4rem)",
              maxWidth: "80vw",
            }}
          ></CalendarComponent>
        )}
      </div>
    </div>
  );
}

export default App;
