import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import type { Box } from '../types';

interface FillBoxAmountProps {
  box: Box;
  isOpen: boolean;
  onBack: () => void;
  onConfirm: (amount: string) => void;
}

const FillBoxAmount: React.FC<FillBoxAmountProps> = ({
  box,
  isOpen,
  onBack,
  onConfirm,
}) => {
  const [amount, setAmount] = useState('');

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/,/g, '');
    const cleanValue = numericValue.replace(/[^0-9]/g, '');
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(formatAmount(value));
  };

  const handleConfirm = () => {
    onConfirm(amount);
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onBack}
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[60] p-6 flex flex-col"
            style={{
              maxHeight: '90vh',
            }}
          >
            <p className="text-3xl font-hana-regular text-text-primary !mb-8 !mt-3">
              <span className="font-hana-bold">금액</span>을 입력해 주세요
            </p>

            <div className="mb-8">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="100,000"
                    intent="green"
                    font="regular"
                    className="!text-2xl !px-4"
                  />
                </div>
                <span className="text-4xl font-hana-medium text-text-secondary whitespace-nowrap">
                  원
                </span>
              </div>
            </div>

            <div className="mt-112">
              <div className="flex gap-3">
                <Button
                  intent="silver"
                  size="lg"
                  font="regular"
                  className="!text-2xl flex-[2] !tracking-[0.2em] !text-center"
                  onClick={onBack}
                >
                  뒤로
                </Button>
                <Button
                  intent="green"
                  size="lg"
                  font="bold"
                  className="!text-2xl flex-[3] !tracking-[0.2em]"
                  onClick={handleConfirm}
                >
                  확인
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Portal로 body에 렌더링 - 루트레이아웃 mb 벗어나기
  return createPortal(modal, document.body);
};

export default FillBoxAmount;
