import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';
import { fetchEventById } from '../home/api/eventsApi';
import { toggleFavourite, isFavourite } from '../../shared/storage/favourites';
import MapView, { Marker } from 'react-native-maps';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const EventDetailsScreen: React.FC<Props> = ({ route }) => {
  const eventId = route.params?.eventId ?? '';
  const [event, setEvent] = useState<any | undefined>();
  const [favourite, setFavourite] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fav = await isFavourite(eventId);
      setFavourite(fav);
      const data = await fetchEventById(eventId);
      setEvent(data?.events?.[0] ?? data);
      setLoading(false);
    })();
  }, [eventId]);

  const region = useMemo(() => {
    const lat = event?.venue?.location?.lat ?? event?.venue?.lat ?? 0;
    const lon = event?.venue?.location?.lon ?? event?.venue?.lon ?? 0;
    return {
      latitude: Number(lat) || 0,
      longitude: Number(lon) || 0,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
  }, [event]);

  const onToggleFavourite = async () => {
    const next = await toggleFavourite(String(eventId));
    setFavourite(next);
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (!event)
    return (
      <View style={styles.center}>
        <Text>No event found</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Image */}
      {!!event?.images?.length && (
        <View style={styles.hero}>
          <Image
            source={{ uri: event?.images?.[0] }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>
              {event.title || event.short_title}
            </Text>
          </View>
        </View>
      )}

      {/* Favourite */}
      <TouchableOpacity
        style={styles.favButton}
        onPress={onToggleFavourite}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 22 }}>{favourite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      {/* Venue Info */}
      <View style={styles.card}>
        <Text style={styles.icon}>📍</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.venue}>{event.venue?.name}</Text>
          <Text style={styles.venueDetails}>{event.venue?.city}</Text>
          {event.venue?.address && (
            <Text style={styles.address}>{event.venue.address}</Text>
          )}
        </View>
      </View>

      {/* Map Section */}
      {!!region.latitude && !!region.longitude && (
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={region}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title={event.venue?.name}
              description={event.venue?.address}
            />
          </MapView>
        </View>
      )}

      {/* Date/Time */}
      {event?.datetime_utc && (
        <View style={styles.card}>
          <Text style={styles.icon}>📅</Text>
          <View>
            <Text style={styles.date}>
              {new Date(event.datetime_utc).toLocaleDateString()}
            </Text>
            <Text style={styles.time}>
              {new Date(event.datetime_utc).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
      )}

      {/* Performers */}
      {event.performers?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {event.performers.map((p: any) => (
              <View key={p.id} style={styles.performer}>
                {p.image && (
                  <Image
                    source={{ uri: p.image }}
                    style={styles.performerImage}
                  />
                )}
                <Text style={styles.performerName} numberOfLines={1}>
                  {p.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Description */}
      {event.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { paddingBottom: 40, backgroundColor: '#f8f9fa' },

  // Hero Section
  hero: { position: 'relative' },
  heroImage: { width: '100%', height: 240 },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroText: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  heroTitle: { fontSize: 22, fontWeight: '700', color: 'white' },

  mapContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  map: {
    width: '100%',
    height: 220,
  },

  // Favourite button
  favButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    elevation: 3,
  },

  // Venue
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
    gap: 10,
  },
  icon: { fontSize: 20, marginTop: 2 },
  venue: { fontSize: 16, fontWeight: '600' },
  venueDetails: { fontSize: 14, color: '#555' },
  address: { fontSize: 12, color: '#777' },

  // Date/Time
  date: { fontSize: 15, fontWeight: '600' },
  time: { fontSize: 13, color: '#444' },

  // Sections
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },

  // Performers
  performer: { marginRight: 12, alignItems: 'center', width: 80 },
  performerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 4,
  },
  performerName: { fontSize: 12, textAlign: 'center' },

  // Description
  description: { fontSize: 14, lineHeight: 20, color: '#333' },
});

export default EventDetailsScreen;
