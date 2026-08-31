import AppRoutes from './routes/AppRoutes.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

/**
 * App shell: persistent Header/Footer around the routed page content.
 * Individual pages (Home, Search, ListingDetails, dashboards, etc.) are
 * implemented in src/pages/ during the Frontend phase.
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
