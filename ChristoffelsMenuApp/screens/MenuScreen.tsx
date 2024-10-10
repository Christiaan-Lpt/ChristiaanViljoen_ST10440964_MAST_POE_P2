import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    MenuScreen: undefined;
    AddDishScreen: { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>, setTotalItems: React.Dispatch<React.SetStateAction<number>> };
    FilterScreen: undefined;
};

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MenuScreen'>;
type MenuScreenRouteProp = RouteProp<RootStackParamList, 'MenuScreen'>;

interface MenuItem {
    name: string;
    description: string;
    course: string;
    price: string;
}

interface MenuScreenProps {
    navigation: MenuScreenNavigationProp;
    route: MenuScreenRouteProp;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);

    const addDishHandler = () => {
        navigation.navigate('AddDishScreen', { setMenuItems, setTotalItems });
    };

    return (
        <ImageBackground source={require('../assets/Background.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Menu</Text>
                <Text>Total Items: {totalItems}</Text>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.menuItem}>
                            <Text>{item.name} - {item.course} - R{item.price}</Text>
                        </View>
                    )}
                />
                <TouchableOpacity onPress={addDishHandler} style={styles.button}>
                    <Text style={styles.buttonText}>Add Dish</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')} style={styles.button}>
                    <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: 'rgba(245, 245, 220, 0.7)',
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    menuItem: { marginVertical: 8 },
    button: { backgroundColor: '#8FBC8F', padding: 10, marginTop: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default MenuScreen;