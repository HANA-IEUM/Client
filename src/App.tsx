// import AppRouter from './app/AppRouter';
import ReactQueryProvider from './app/providers/ReactQueryProvider';
import ButtonExamples from '@/components/button/Button.examples';
import InputExamples from '@/components/input/Input.examples';

function App() {
  return (
    <ReactQueryProvider>
      <ButtonExamples />
      <InputExamples />
      {/* <AppRouter /> */}
    </ReactQueryProvider>
  );
}

export default App;
