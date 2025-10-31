import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1 p-4">
        <Calendar
          rows={90}
          cols={52}
          className="mx-auto h-full w-full max-w-[80vw]"
        ></Calendar>
      </div>
    </div>
  );
}

export default App;
