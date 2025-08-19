import { useTranslation } from 'react-i18next';
import { SortBy } from '../../functions';
import { Container, ItemLabel, ItemPressable } from './DropDownSort.styles';

type DropDownSortPropsType = {
  sortBy: SortBy;
  onChange: (value: SortBy) => void;
};

const DropDownSort = ({ sortBy, onChange }: DropDownSortPropsType) => {
  const { t } = useTranslation();
  const items = [
    { label: t('COMPONENTS.DROPDOWN.title_az'), value: SortBy.TITLE_AZ },
    { label: t('COMPONENTS.DROPDOWN.pages_few_many'), value: SortBy.PAGES },
    {
      label: t(t('COMPONENTS.DROPDOWN.date_old_new')),
      value: SortBy.RELEASE_DATE,
    },
  ];

  const Item = ({ label, value }: { label: string; value: SortBy }) => (
    <ItemPressable onPress={() => onChange(value)} hitSlop={8}>
      <ItemLabel active={sortBy === value}>{label}</ItemLabel>
    </ItemPressable>
  );

  return (
    <Container>
      {items.map(item => (
        <Item label={item.label} value={item.value} key={item.label} />
      ))}
    </Container>
  );
};

export default DropDownSort;
