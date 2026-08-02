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
  { id: '1', name: 'Jane Doe', title: 'HOA President', email: 'president@encantadahoa.com' },
  { id: '2', name: 'John Smith', title: 'Treasurer', email: 'treasurer@encantadahoa.com' },
  { id: '3', name: 'Alice Johnson', title: 'Secretary', email: 'secretary@encantadahoa.com' },
];

const CAM_MANAGEMENT = {
  company: 'Encantada Community Management',
  camName: 'Robert Sterling, LCAM',
  email: 'manager@encantadahoa.com',
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
    if (!bookingDate.trim()) return Alert.alert('Error', 'You have a typo on line **341** in `src/app/index.tsx`. `justify.content` has an accidental period instead of camelCase.

### Fix
Open `src/app/index.tsx` and change **`justify.content`** to **`justifyContent`**:

```tsx
// ❌ Before
flexDirection: 'row', 
alignItems: 'center', 
justify.content: 'space-between', 

// ✅ After
flexDirection: 'row', 
alignItems: 'center', 
justifyContent: 'space-between',