import Canvas from './components/Canvas';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Canvas />
      </main>
      <div className="fixed bottom-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;

