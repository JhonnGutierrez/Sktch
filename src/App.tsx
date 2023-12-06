import StageKonva from "./components/konva/StageKonva";
import Aside from "./components/tools/Aside";
import Header from "./components/tools/Header";

function App() {
  return (
    <div className="dark w-screen min-h-screen text-white bg-background">
      <Header />
      <section className="relative">
        <main className="w-full z-10 h-[calc(100vh-3.5rem)] grid place-content-center overflow-hidden">
          <StageKonva />
        </main>
        <Aside />
      </section>
    </div>
  );
}

export default App;
