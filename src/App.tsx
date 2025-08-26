import ReactQueryProvider from './app/providers/ReactQueryProvider';
import AppRouter from './app/AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ReactQueryProvider>
      <Toaster
        position="bottom-center"
        gutter={8}
        containerStyle={{
          bottom: 'max(16px, env(safe-area-inset-bottom))',
          padding: '0 16px',
        }}
        toastOptions={{
          duration: 2000,
        }}
      />
      <AppRouter />
    </ReactQueryProvider>
  );
}

export default App;
