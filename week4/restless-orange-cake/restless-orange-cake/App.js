import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  Linking,
  ScrollView
} from 'react-native';

// ========== LOGIN SCREEN COMPONENT ==========
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>🇳🇵 Nepal Heritage Guide</Text>
        <Text style={styles.loginSubtitle}>Login to continue</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => {
            if (username && password) {
              onLogin();
            }
          }}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ========== HOME SCREEN (DASHBOARD) ==========
const heritageSites = [
  {
    id: '1',
    name: 'Pashupatinath Temple',
    price: 'NPR 1000',
    description: 'Sacred Hindu temple on Bagmati river, UNESCO World Heritage Site. One of the holiest temples for Hindus worldwide.',
    location: 'Kathmandu',
    latitude: 27.7104,
    longitude: 85.3486,
  },
  {
    id: '2',
    name: 'Swayambhunath Stupa',
    price: 'NPR 200',
    description: 'Ancient religious complex atop a hill, also known as Monkey Temple. Offers panoramic views of Kathmandu Valley.',
    location: 'Kathmandu',
    latitude: 27.7148,
    longitude: 85.2902,
  },
  {
    id: '3',
    name: 'Boudhanath Stupa',
    price: 'NPR 400',
    description: 'One of the largest stupas in the world. Tibetan Buddhist center with a massive mandala design.',
    location: 'Kathmandu',
    latitude: 27.7215,
    longitude: 85.3618,
  },
  {
    id: '4',
    name: 'Kathmandu Durbar Square',
    price: 'NPR 750',
    description: 'Historic palace complex with ancient temples and architecture. Home to the Living Goddess Kumari.',
    location: 'Kathmandu',
    latitude: 27.7042,
    longitude: 85.3074,
  },
  {
    id: '5',
    name: 'Patan Durbar Square',
    price: 'NPR 500',
    description: 'Beautiful Newari architecture and Krishna Temple. Known as the city of fine arts.',
    location: 'Lalitpur',
    latitude: 27.6745,
    longitude: 85.3246,
  },
  {
    id: '6',
    name: 'Pokhara Lakeside',
    price: 'Free Entry',
    description: 'Scenic lake with Annapurna mountain views. Boating, paragliding, and amazing sunsets.',
    location: 'Pokhara',
    latitude: 28.2096,
    longitude: 83.9857,
  },
];

const HomeScreen = ({ navigation }) => {
  const renderHeritageCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { site: item })}>
        <View style={styles.cardImage}>
          <Text style={styles.cardImageText}>🏛️ {item.name}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.siteName}>{item.name}</Text>
          <Text style={styles.location}>📍 {item.location}</Text>
          <Text style={styles.price}>💰 {item.price}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>🏆 UNESCO Heritage</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🇳🇵 Nepal Heritage Guide</Text>
        <Text style={styles.headerSubtitle}>Discover cultural treasures</Text>
      </View>
      <FlatList
        data={heritageSites}
        renderItem={renderHeritageCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

// GOOGLE MAPS 
const DetailsScreen = ({ route, navigation }) => {
  const { site } = route.params;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${site.latitude},${site.longitude}`;
    Linking.openURL(url).catch(err => {
      console.error('Error opening maps:', err);
      alert('Could not open maps');
    });
  };

  return (
    <ScrollView style={styles.detailsContainer}>
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>{site.name}</Text>
        <Text style={styles.detailsLocation}> {site.location}</Text>
        
        <View style={styles.priceBadge}>
          <Text style={styles.detailsPrice}>Entry Fee: {site.price}</Text>
        </View>
        
        <Text style={styles.detailsDescriptionTitle}>Description</Text>
        <Text style={styles.detailsDescription}>{site.description}</Text>
        
        <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
          <Text style={styles.mapButtonText}> Open in Google Maps</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// ========== MAIN APP COMPONENT WITH NAVIGATION ==========
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedSite, setSelectedSite] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('Home');
  };

  const navigateTo = (screen, params = {}) => {
    if (screen === 'Details') {
      setSelectedSite(params.site);
      setCurrentScreen('Details');
    } else {
      setCurrentScreen(screen);
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentScreen === 'Home') {
    return <HomeScreen navigation={{ navigate: navigateTo }} />;
  }

  if (currentScreen === 'Details' && selectedSite) {
    return <DetailsScreen route={{ params: { site: selectedSite } }} navigation={{ goBack: () => setCurrentScreen('Home') }} />;
  }

  return <HomeScreen navigation={{ navigate: navigateTo }} />;
}

// ========== STYLES ==========
const styles = StyleSheet.create({
  // Login Screen Styles
  loginContainer: {
    flex: 1,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Home Screen Styles
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#E74C3C',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffe0d9',
    textAlign: 'center',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 15,
  },
  siteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#E74C3C',
    marginTop: 3,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
    marginTop: 5,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
    lineHeight: 18,
  },
  tag: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  tagText: {
    fontSize: 11,
    color: '#E74C3C',
    fontWeight: 'bold',
  },

  // Details Screen Styles
  detailsContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailsCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsLocation: {
    fontSize: 18,
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 15,
  },
  priceBadge: {
    backgroundColor: '#27AE60',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsDescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 25,
  },
  mapButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  mapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});