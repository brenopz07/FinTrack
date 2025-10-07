import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicial from '../Pages/Inicial';


const AuthStack = createNativeStackNavigator();

function AuthRoutes(){
  return(
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name="Inicial"
        component={Inicial}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthRoutes;