import { Pressable, Text, View } from 'react-native';
import { SortBy } from '../functions';

type DropDownSortPropsType = {
  sortBy: SortBy;
  onChange: (value: SortBy) => void;
};

const DropDownSort = ({ sortBy, onChange }: DropDownSortPropsType) => {
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
      <Item label="א-ת" value={SortBy.TITLE_AZ} />
      <Item label="עמודים" value={SortBy.PAGES} />
      <Item label="תאריך הוצאה" value={SortBy.RELEASE_DATE} />
    </View>
  );
};

export default DropDownSort;
