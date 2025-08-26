import AppRouter from './app/AppRouter';
import ReactQueryProvider from './app/providers/ReactQueryProvider';
import ButtonExamples from './components/button/Button.examples';

function App() {
  return (
    <ReactQueryProvider>
      <AppRouter />
    </ReactQueryProvider>
  );
}

export default App;
