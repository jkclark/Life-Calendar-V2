import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1 px-4">
        <Calendar
          rows={90}
          cols={52}
          className="mx-auto w-full max-w-[80vw]"
          style={{
            height: "calc(100vh - 5rem)",
            maxHeight: "calc(100vh - 5rem)",
          }}
        ></Calendar>
      </div>
    </div>
  );
}

export default App;
