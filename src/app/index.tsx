import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  FlatList, 
  TextInput,
  Alert 
} from 'react-native';

const BOARD_MEMBERS = [
  { id: '1', name: 'Jane Doe', title: 'HOA President', email: 'president@encantada-hoa.com' },
  { id: '2', name: 'John Smith', title: 'Treasurer', email: 'treasurer@encantada-hoa.com' },
  { id: '3', name: 'Alice Johnson', title: 'Secretary', email: 'secretary@encantada-hoa.com' },
];

const CAM_MANAGEMENT = {
  company: 'Encantada Community Management',
  camName: 'Robert Sterling, LCAM',
  email: 'manager@encantada-hoa.com',
  phone: '(954) 555-0199',
  officeHours: 'Mon - Fri, 9:00 AM - 4:00 PM EST'
};

const OFFICIAL_DOCUMENTS = [
  { id: '1', title: 'Declaration of Covenants, Conditions & Restrictions (CC&Rs)', category: 'Governing Docs', year: 'Permanent', size: '4.2 MB' },
  { id: '2', title: 'Articles of Incorporation & Bylaws', category: 'Governing Docs', year: 'Permanent', size: '2.8 MB' },
  { id: '3', title: '2026 Annual Approved Budget & Reserve Study', category: 'Financials', year: '2026', size: '1.5 MB' },
  { id: '4', title: '2025 End-of-Year Financial Audit Statement', category: 'Financials', year: '2025', size: '2.1 MB' },
  { id: '5', title: '2024 Executory Contracts & Insurance Policies', category: 'Contracts', year: '2024', size: '3.7 MB' },
  { id: '6', title: '2023 Board Meeting Minutes Archive', category: 'Minutes', year: '2023', size: '1.9 MB' },
  { id: '7', title: '2022 Board Meeting Minutes Archive', category: 'Minutes', year: '2022', size: '1.8 MB' },
  { id: '8', title: '2021 Board Meeting Minutes Archive', category: 'Minutes', year: '2021', size: '1.6 MB' },
];

const AMENITIES = ['Clubhouse', 'Swimming Pool', 'Tennis Courts', 'Community BBQ'];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [unitAddress, setUnitAddress] = useState('');
  const [password, setPassword] = useState('');

  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const [tickets, setTickets] = useState([
    { id: '1', title: 'Broken streetlight near main entrance', status: 'In Progress' }
  ]);
  const [newTicket, setNewTicket] = useState('');
  const [bookings, setBookings] = useState([
    { id: '1', amenity: 'Clubhouse', date: 'August 15, 2026' }
  ]);
  const [selectedAmenity, setSelectedAmenity] = useState(AMENITIES[0]);
  const [bookingDate, setBookingDate] = useState('');
  const [selectedDocCategory, setSelectedDocCategory] = useState('All');

  const handleLogin = () => {
    if (!unitAddress.trim() || !password.trim()) {
      return Alert.alert('Authentication Error', 'Please enter your registered unit address and password.');
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('Dashboard');
  };

  const handleCreateTicket = () => {
    if (!newTicket.trim()) return Alert.alert('Error', 'Please enter a description');
    setTickets([...tickets, { id: Date.now().toString(), title: newTicket, status: 'Open' }]);
    setNewTicket('');
    Alert.alert('Success', 'Maintenance ticket submitted!');
  };

  const handleBookAmenity = () => {
    if (!bookingDate.trim()) return Alert.alert('Error', 'Please enter a date');
    setBookings([...bookings, { id: Date.now().toString(), amenity: selectedAmenity, date: bookingDate }]);
    setBookingDate('');
    Alert.alert('Success', `${selectedAmenity} booked for ${bookingDate}!`);
  };

  const RenderLogin = () => {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Encantada HOA</Text>
        <Text style={styles.loginSubtitle}>Official Member Records Portal</Text>
        
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            🔒 Protected Portal: In compliance with Florida Chapter 720, official association records are restricted strictly to verified parcel owners.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Parcel / Unit Address:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Encantada Way" 
            value={unitAddress}
            onChangeText={setUnitAddress}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter member password" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Sign In to Secure Portal</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RenderDashboard = () => {
    return (
      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>Welcome back, Resident 👋</Text>
        <Text style={styles.subtitleText}>Encantada Homeowners Association</Text>
        
        <View style={styles.grid}>
          <TouchableOpacity style={styles.cardFullWidth} onPress={() => setCurrentScreen('Documents')}>
            <Text style={styles.cardIcon}>📚</Text>
            <Text style={styles.cardTitle}>Official HOA Records & Bylaws</Text>
            <Text style={styles.cardBadge}>Florida Chapter 720 Compliant</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => setCurrentScreen('Board')}>
            <Text style={styles.cardIcon}>👥</Text>
            <Text style={styles.cardTitle}>Board & CAM Contacts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.card} onPress={() => setCurrentScreen('Maintenance')}>
            <Text style={styles.cardIcon}>🛠️</Text>
            <Text style={styles.cardTitle}>Maintenance Requests</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cardFullWidth} onPress={() => setCurrentScreen('Booking')}>
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardTitle}>Reserve Community Amenities</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const RenderDocuments = () => {
    const categories = ['All', 'Governing Docs', 'Financials', 'Contracts', 'Minutes'];
    const filteredDocs = selectedDocCategory === 'All' 
      ? OFFICIAL_DOCUMENTS 
      : OFFICIAL_DOCUMENTS.filter(d => d.category === selectedDocCategory);

    return (
      <View style={styles.content}>
        <Text style={styles.screenTitle}>Official Records Vault</Text>
        <Text style={styles.helperText}>Downloadable official records maintained pursuant to FL Statute 720.303.</Text>
        
        <View style={styles.pickerRow}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.pickerItem, selectedDocCategory === cat && styles.pickerItemActive]}
              onPress={() => setSelectedDocCategory(cat)}
            >
              <Text style={{ color: selectedDocCategory === cat ? '#FFF' : '#333', fontSize: 12 }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredDocs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.itemHeader}>{item.title}</Text>
                <Text style={styles.itemSub}>Year: {item.year} • {item.size} • {item.category}</Text>
              </View>
              <TouchableOpacity style={styles.smallButton} onPress={() => Alert.alert('Downloading Record', `Accessing ${item.title}...`)}>
                <Text style={styles.buttonTextTextText}>Download</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  };

  const RenderBoard = () => {
    return (
      <ScrollView style={styles.content}>
        <Text style={styles.screenTitle}>Official Directory</Text>
        
        <View style={styles.camCard}>
          <Text style={styles.camTitle}>Licensed Community Association Manager</Text>
          <Text style={styles.camName}>{CAM_MANAGEMENT.camName}</Text>
          <Text style={styles.camSub}>{CAM_MANAGEMENT.company}</Text>
          <Text style={styles.camDetail}>📧 {CAM_MANAGEMENT.email}</Text>
          <Text style={styles.camDetail}>📞 {CAM_MANAGEMENT.phone}</Text>
          <Text style={styles.camDetail}>⏰ Hours: {CAM_MANAGEMENT.officeHours}</Text>
        </View>

        <Text style={styles.sectionHeader}>Board of Directors</Text>
        {BOARD_MEMBERS.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <View>
              <Text style={styles.itemHeader}>{item.name}</Text>
              <Text style={styles.itemSub}>{item.title}</Text>
            </View>
            <TouchableOpacity style={styles.smallButton} onPress={() => Alert.alert('Email Officer', `Opening mail to ${item.email}`)}>
              <Text style={styles.buttonTextTextText}>Contact</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  const RenderMaintenance = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.screenTitle}>Maintenance Tickets</Text>
        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Describe common element damage..."
            value={newTicket}
            onChangeText={setNewTicket}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleCreateTicket}>
            <Text style={styles.primaryButtonText}>Submit Ticket</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionHeader}>Active Requests</Text>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemHeader}>{item.title}</Text>
              <View style={[styles.badge, { backgroundColor: item.status === 'Open' ? '#FFE2E2' : '#E2F0FF' }]}>
                <Text style={{ color: item.status === 'Open' ? '#CC0000' : '#0066CC', fontWeight: 'bold' }}>{item.status}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const RenderBooking = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.screenTitle}>Reserve an Amenity</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Select Amenity:</Text>
          <View style={styles.pickerRow}>
            {AMENITIES.map((amenity) => (
              <TouchableOpacity 
                key={amenity} 
                style={[styles.pickerItem, selectedAmenity === amenity && styles.pickerItemActive]}
                onPress={() => setSelectedAmenity(amenity)}
              >
                <Text style={{ color: selectedAmenity === amenity ? '#FFF' : '#333' }}>{amenity}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput 
            style={styles.input} 
            placeholder="Enter Date (e.g. August 20, 2026)"
            value={bookingDate}
            onChangeText={setBookingDate}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleBookAmenity}>
            <Text style={styles.primaryButtonText}>Book Reservation</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionHeader}>Your Reservations</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemHeader}>{item.amenity}</Text>
              <Text style={styles.itemSub}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <RenderLogin />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {currentScreen !== 'Dashboard' ? (
          <TouchableOpacity onPress={() => setCurrentScreen('Dashboard')} style={styles.backButton}>
            <Text style={styles.backButtonText}>⬅ Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleLogout} style={styles.backButton}>
            <Text style={{ color: '#DC3545', fontWeight: '600' }}>Lock Portal</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Encantada HOA</Text>
        <View style={{ width: 60 }} /> 
      </View>

      {currentScreen === 'Dashboard' && <RenderDashboard />}
      {currentScreen === 'Documents' && <RenderDocuments />}
      {currentScreen === 'Board' && <RenderBoard />}
      {currentScreen === 'Maintenance' && <RenderMaintenance />}
      {currentScreen === 'Booking' && <RenderBooking />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', marginTop: 40 },
  loginContainer: { flex: 1, padding: 24, justifyContent: 'center' },
  loginTitle: { fontSize: 28, fontWeight: 'bold', color: '#1B365D', textAlign: 'center' },
  loginSubtitle: { fontSize: 15, color: '#6C757D', textAlign: 'center', marginBottom: 20 },
  noticeBox: { backgroundColor: '#EBF3FC', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#BEE0FF', marginBottom: 20 },
  noticeText: { color: '#004085', fontSize: 13, lineHeight: 18 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#FFF'
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1B365D' },
  backButton: { padding: 4 },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  content: { flex: 1, padding: 20 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#212529' },
  subtitleText: { fontSize: 14, color: '#6C757D', marginTop: 4, marginBottom: 20 },
  helperText: { fontSize: 13, color: '#6C757D', marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { 
    width: '47%', 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center'
  },
  cardFullWidth: {
    width: '100%', 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 12, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D0E3FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center'
  },
  cardIcon: { fontSize: 32, marginBottom: 6 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#212529', textAlign: 'center' },
  cardBadge: { fontSize: 11, color: '#0066CC', fontWeight: '600', marginTop: 4 },
  screenTitle: { fontSize: 22, fontWeight: '700', color: '#1B365D', marginBottom: 12 },
  sectionHeader: { fontSize: 16, fontWeight: '600', color: '#495057', marginTop: 20, marginBottom: 12 },
  camCard: { backgroundColor: '#1B365D', padding: 18, borderRadius: 10, marginBottom: 12 },
  camTitle: { color: '#90C2FF', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  camName: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  camSub: { color: '#E1E9F5', fontSize: 13, marginBottom: 10 },
  camDetail: { color: '#FFF', fontSize: 13, marginTop: 2 },
  listItem: { 
    backgroundColor: '#FFF', 
    padding: 14, 
    borderRadius: 8, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF'
  },
  itemHeader: { fontSize: 14, fontWeight: '600', color: '#212529' },
  itemSub: { fontSize: 12, color: '#6C757D', marginTop: 2 },
  smallButton: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  buttonTextTextText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  formContainer: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#E9ECEF' },
  input: { borderWidth: 1, borderColor: '#CED4DA', borderRadius: 6, padding: 10, marginBottom: 12, fontSize: 14 },
  primaryButton: { backgroundColor: '#1B365D', padding: 12, borderRadius: 6, alignItems: 'center' },
  primaryButtonText: { color: '#FFF', fontWeight: '600', fontSize: 15 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 6, color: '#495057' },
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  pickerItem: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#CED4DA', marginRight: 6, marginBottom: 8 },
  pickerItemActive: { backgroundColor: '#1B365D', borderColor: '#1B365D' }
});