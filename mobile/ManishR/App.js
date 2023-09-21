import { useState, useEffect } from "react";
import styled from 'styled-components/native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Loading } from "./components/Loading";
import { HomeScreen } from "./components/HomeScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FinalScreen } from "./components/FinalScreen";
const Stack = createNativeStackNavigator()


export default function App() {
  const CheckToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      console.log(token);
  
      try {
        const response = await axios.post('https://servermanishr.onrender.com/auth/verify', {
          accessToken: token,
        });
        console.log(response);
        setinitialRoute('Final');

        setTimeout(() => {
          setFirstLaunch(false);
        }, 3000);
      } catch (error) {
        console.error('Error in axios.post:', error);
        setTimeout(() => {
          setFirstLaunch(false);
        }, 3000);      }
    } catch (error) {
      console.error('Error in AsyncStorage.getItem:', error);
      setinitialRoute('Home');
    }
  };
  const [firstLaunch, setFirstLaunch] = useState(true)
  const [initialRoute, setinitialRoute] = useState('Home')
  useEffect(()=>{
    CheckToken()
  },[])


  if(firstLaunch){
    return <Loading />
  }
  return(
    <NavigationContainer>
     <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Final" component={FinalScreen} options={{ headerShown: false }} />
      

     </Stack.Navigator>
    </NavigationContainer>
    
  )
}

const Wrapper = styled.View`
  
  flex:1;
  padding: 15px;
  flex-direction: column;
  text-align:center;
  background: rgb(240,247,247);
;


`;
