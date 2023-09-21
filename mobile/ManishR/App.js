import { useState, useEffect } from "react";
import styled from 'styled-components/native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Loading } from "./components/Loading";
import { HomeScreen } from "./components/HomeScreen";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";


const Stack = createNativeStackNavigator()


export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(true)
  useEffect(()=>{
    setTimeout(() => {
      setFirstLaunch(false)
    }, 3000);
  },[])


  if(firstLaunch){
    return <Loading />
  }
  return(
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
     

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
