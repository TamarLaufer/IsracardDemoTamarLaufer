import { Pressable, Text, View } from 'react-native';
import { SortBy } from '../functions';
import { useTranslation } from 'react-i18next';

type DropDownSortPropsType = {
  sortBy: SortBy;
  onChange: (value: SortBy) => void;
};

const DropDownSort = ({ sortBy, onChange }: DropDownSortPropsType) => {
  const { t } = useTranslation();
  const Item = ({ label, value }: { label: string; value: SortBy }) => (
    <Pressable onPress={() => onChange(value)}>
      <Text
        style={{
          padding: 8,
          fontWeight: sortBy === value ? '700' : '400',
          color: sortBy === value ? '#007AFF' : '#444',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 12,
        paddingVertical: 4,
      }}
    >
      <Item label={t('COMPONENTS.DROPDOWN.title_az')} value={SortBy.TITLE_AZ} />
      <Item
        label={t('COMPONENTS.DROPDOWN.pages_few_many')}
        value={SortBy.PAGES}
      />
      <Item
        label={t('COMPONENTS.DROPDOWN.date_old_new')}
        value={SortBy.RELEASE_DATE}
      />
    </View>
  );
};

export default DropDownSort;
