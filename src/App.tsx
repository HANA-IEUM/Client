import AppRouter from './app/AppRouter';
import ReactQueryProvider from './app/providers/ReactQueryProvider';

function App() {
  return (
    <ReactQueryProvider>
      <AppRouter />
    </ReactQueryProvider>
  );
}

export default App;
