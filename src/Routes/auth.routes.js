import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicial from '../Pages/Inicial';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import Home from '../Pages/Home';

const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen 
        name="Inicial"
        component={Inicial}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen 
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen 
        name="Cadastro"
        component={Cadastro}
        options={{
          headerShown: false,
        }}
      />
      
    </AuthStack.Navigator>
  )
}

export default AuthRoutes;