import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screens/MenuScreen';
import FilterScreen from './screens/FilterScreen';
import AddDishScreen from './screens/AddDishScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ title: 'Menu' }}
        />
        <Stack.Screen 
          name="FilterScreen" 
          component={FilterScreen} 
          options={{ title: 'Filter Dishes' }}
        />
        <Stack.Screen 
          name="AddDishScreen" 
          component={AddDishScreen} 
          options={{ title: 'Add Dish' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
