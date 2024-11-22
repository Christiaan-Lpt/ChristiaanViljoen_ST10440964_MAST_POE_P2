import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    MenuScreen: { filteredItems?: MenuItem[] };
    AddDishScreen: { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };
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

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation, route }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);  // Empty array to start with

    // Ensure that filtered items are passed properly from FilterScreen
    useEffect(() => {
        if (route.params?.filteredItems) {
            setMenuItems(route.params.filteredItems);
        }
    }, [route.params?.filteredItems]);

    // Function to add dish, navigates to AddDishScreen
    const addDishHandler = () => {
        navigation.navigate('AddDishScreen', { setMenuItems });
    };

    // Calculate the average price for a given course
    const calculateAveragePrice = (course: string) => {
        const filteredItems = menuItems.filter(item => item.course.toLowerCase() === course.toLowerCase());
        const total = filteredItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        return filteredItems.length > 0 ? (total / filteredItems.length).toFixed(2) : '0.00';
    };

    return (
        <ImageBackground source={require('../assets/Background.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to the Menu</Text>
                <Text style={styles.subtitle}>Total Dishes: {menuItems.length}</Text>
                <Text style={styles.subtitle}>Average Price - Starters: R{calculateAveragePrice('starter')}</Text>
                <Text style={styles.subtitle}>Average Price - Mains: R{calculateAveragePrice('main')}</Text>
                <Text style={styles.subtitle}>Average Price - Desserts: R{calculateAveragePrice('dessert')}</Text>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardText}>Course: {item.course}</Text>
                            <Text style={styles.cardText}>Price: R{item.price}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#555',
    },
    button: {
        backgroundColor: '#8FBC8F',
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MenuScreen;
