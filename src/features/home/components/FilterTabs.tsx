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
      className="flex space-x-2 px-6 w-full justify-between"
      role="tablist"
      aria-label="Filter options"
    >
      {tabs.map(({ id, label }) => (
        <Button
          key={id}
          label={label}
          size="lg"
          intent={id === selected ? 'green' : 'mint'}
          font="regular"
          onClick={() => setSelected(id)}
          role="tab"
          className="rounded-3xl"
          aria-selected={id === selected}
        />
      ))}
    </nav>
  );
};
