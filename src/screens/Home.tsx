import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  Book,
  RootStackParamList,
  TabsParamList,
} from '../types/navigation';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useGetBooksQuery } from '../api/booksApi';
import { FlashList } from '@shopify/flash-list';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Home = ({ navigation }: NavigationProps) => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const qNorm = q.trim().toLowerCase();
    return (data ?? []).filter(b =>
      (b.title ?? '').toLowerCase().includes(qNorm),
    );
  }, [data, q]);
  console.log(list);

  if (isLoading) return <Text style={{ padding: 16 }}>טוען ספרים…</Text>;
  if (isError) return <Text style={{ padding: 16 }}>שגיאה בטעינת ספרים</Text>;

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="חיפוש…"
        value={q}
        onChangeText={setQ}
        style={{
          margin: 12,
          padding: 10,
          backgroundColor: '#eee',
          borderRadius: 10,
        }}
      />
      <FlashList<Book>
        data={list}
        keyExtractor={b => b.number}
        estimatedItemSize={110}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('BookDetails', { book: item })}
            style={{
              flexDirection: 'row',
              padding: 12,
              gap: 12,
              alignItems: 'center',
            }}
          >
            <Image
              source={{
                uri:
                  item.cover ||
                  'https://via.placeholder.com/60x90?text=No+Image',
              }}
              style={{ width: 60, height: 90, borderRadius: 6 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }} numberOfLines={1}>
                {item.title}
              </Text>
              <Text>{new Date(item.releaseDate).toLocaleDateString()}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#eee' }} />
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>לא נמצאו ספרים</Text>}
      />
    </View>
  );
};

export default Home;
