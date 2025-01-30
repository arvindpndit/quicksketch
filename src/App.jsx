import Canvas from './components/Canvas';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 w-full z-10">
        <Header />
      </div>
      <main className="flex-grow pt-16 pb-16">
        <Canvas />
      </main>
      <divv className="fixed bottom-0 w-full z-10">
        <Footer />
      </divv>
    </div>
  );
}

export default App;

