import Button from '@/components/button/Button.tsx';

export type Tab = {
  id: string;
  label: string;
};

export type FilterTabsProps = {
  tabs: Tab[];
  selected: string;
  setSelected: (selected: string) => void;
};

export const FilterTabs = ({
  tabs,
  selected,
  setSelected,
}: FilterTabsProps) => {
  return (
    <nav
      className="flex w-full justify-start space-x-8 px-6"
      role="tablist"
      aria-label="Filter options"
    >
      {tabs.map(({ id, label }, index) => (
        <Button
          key={id}
          label={label}
          size="lg"
          intent={id === selected ? 'green' : 'mint'}
          font="regular"
          onClick={() => setSelected(id)}
          role="tab"
          className={`rounded-3xl ${index > 0 ? '!ml-2' : ''}`}
          aria-selected={id === selected}
        />
      ))}
    </nav>
  );
};
