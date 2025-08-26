import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../navigation';
import { searchEvents } from './api/eventsApi';
import Input from '../../common/components/Input';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const results = await searchEvents({ keyword, city });
      setEvents(results || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword, city]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={{ fontSize: 20 }}>👤</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderEvent = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('EventDetails', { eventId: String(item.id) })
      }
    >
      <Image
        source={{ uri: item?.images?.[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        {item.venue?.name && (
          <Text style={styles.venue}>{item.venue.name}</Text>
        )}
        {item?.datetime_utc && (
          <Text style={styles.date}>
            {new Date(item?.datetime_utc).toLocaleString()}
          </Text>
        )}
        {item.venue?.city && <Text style={styles.city}>{item.venue.city}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Input
          wrapperStyle={{ width: '50%' }}
          placeholder="Keyword"
          value={keyword}
          onChangeText={setKeyword}
        />
        <Input
          wrapperStyle={{ width: '50%' }}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
      </View>

      {/* Event List */}
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text>No events found. Try different keywords or city.</Text>
            </View>
          }
          data={events}
          keyExtractor={item => String(item.id)}
          renderItem={renderEvent}
          contentContainerStyle={{ paddingVertical: 12 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },

  // Search
  searchRow: { flexDirection: 'row', gap: 8, paddingBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    backgroundColor: 'white',
  },

  // Actions
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },

  // Event Card
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 12 },
  cardContent: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  venue: { fontSize: 14, color: '#555' },
  date: { fontSize: 13, color: '#777', marginTop: 2 },
  city: { fontSize: 13, color: '#007bff', marginTop: 2 },

  // Empty state
  empty: { flex: 1, alignItems: 'center', marginTop: 40 },
});

export default HomeScreen;
