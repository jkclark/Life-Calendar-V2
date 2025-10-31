import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div>
        <Calendar
          rows={10}
          cols={52}
          className="mx-auto max-w-[800px]"
        ></Calendar>
      </div>
    </div>
  );
}

export default App;
