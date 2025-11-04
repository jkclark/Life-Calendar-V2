import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import NewOrImport from "./components/NewOrImport";
// import type { Calendar as CalendarType } from "@life-calendar/common";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1 px-4">
        <NewOrImport />
        {false && (
          <Calendar
            rows={90}
            cols={52}
            className="mx-auto"
            style={{
              height: "min(calc(100vh - 5rem), calc(80vw * 3 / 2))",
              width: "min(80vw, calc((100vh - 4rem) * 2 / 3))",
              maxHeight: "calc(100vh - 4rem)",
              maxWidth: "80vw",
            }}
          ></Calendar>
        )}
      </div>
    </div>
  );
}

export default App;
