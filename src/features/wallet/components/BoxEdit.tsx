import type { Box } from '../types';

interface BoxEditProps {
  box: Box;
  onBack: () => void;
  onSave: () => void;
}

const BoxEdit: React.FC<BoxEditProps> = () => {
  return (
    <div className="w-full h-full pt-5 px-6">대현오뻐거 갖다 써야지 ~</div>
  );
};

export default BoxEdit;
