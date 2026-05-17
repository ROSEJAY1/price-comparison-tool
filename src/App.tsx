import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { useSearchStore } from './store/searchStore';

export default function App() {
  const { products } = useSearchStore();

  if (products.length > 0) {
    return <Results />;
  }

  return <Home />;
}
