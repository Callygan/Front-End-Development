import Timer from "./components/Timer/Timer";
import "./index.css";


export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Timer />
      </div>
    </main>
  );
}