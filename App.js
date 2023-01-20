
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login'
import SignupScreen from './screens/Signup'
import TabNavigator from './navigation/TabNavigator';
import LoginFormScreen from './screens/LoginForm';
import AptViewScreen from './screens/aptview';
import NotifScreen from './screens/notification';
import MedCert from './screens/medcert';
import About from './screens/About';
import Policy from './screens/Policy';
import DetailsScreen from './screens/Details';
import UserProfile from './screens/UserProfile';
import ClinicApt from './screens/aptviewclinic';
import UpdatePw from './screens/UpdatePw';
import NewPw from './screens/NewPw';
import DoctorScreen from './screens/Doctor';
import DoctorOne from './screens/doctorone';
import DoctorTwo from './screens/DoctorTwo';
import FillUpReqMed from './screens/fillupmed';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{ title: 'Home',headerShown: false }}
        />
        <Stack.Screen name="DoctorOne" component={DoctorOne} />
        <Stack.Screen name="DoctorTwo" component={DoctorTwo} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Doctor" component={DoctorScreen} />
        <Stack.Screen name="LoginForm" component={LoginFormScreen} />
        <Stack.Screen name="AptView" component={AptViewScreen} />
        <Stack.Screen name="Notification" component={NotifScreen} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Policy" component={Policy} />
        <Stack.Screen name="Index" component={TabNavigator} />
        <Stack.Screen name="MedCert" component={MedCert} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="AptClinic" component={ClinicApt} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UpdatePw" component={UpdatePw} />
        <Stack.Screen name="NewPw" component={NewPw} />
        <Stack.Screen name="Fillup" component={FillUpReqMed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;