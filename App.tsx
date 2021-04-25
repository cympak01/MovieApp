import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesList from './screens/MoviesList';
import MovieItem from './screens/MovieItem';
import { RootStackParamList } from './types';
import { store } from './store';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator initialRouteName="MoviesList" headerMode="none">
                    <Stack.Screen name="MoviesList" component={MoviesList} />
                    <Stack.Screen name="MovieItem" component={MovieItem} />
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
    );
}
