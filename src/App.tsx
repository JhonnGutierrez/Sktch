import StageKonva from "./components/konva/StageKonva";
import Aside from "./components/tools/Aside";
import Header from "./components/tools/Header";
import ToolBar from "./components/tools/ToolBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark w-screen min-h-[100svh] text-white bg-background overflow-hidden">
        <Header />
        <section className="relative flex">
          <Aside />
          <main className="w-full z-10 h-[calc(100vh-4rem)] grid place-content-center overflow-hidden px-4">
            <StageKonva />
          </main>
          <ToolBar />
        </section>
      </div>
    </QueryClientProvider>
  );
}

export default App;
