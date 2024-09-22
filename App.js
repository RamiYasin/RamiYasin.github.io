import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomPage from './screens/welcomepage.js';
import ChatPage from './screens/chatscreen.js';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomPage"
        component={WelcomPage}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen
          name="Chat"
          component={ChatPage}
          options={{title: 'Chat Boot'}}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
