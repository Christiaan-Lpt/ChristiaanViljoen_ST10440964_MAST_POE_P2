import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    MenuScreen: undefined;
    AddDishScreen: { setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>, setTotalItems: React.Dispatch<React.SetStateAction<number>> };
};

type AddDishScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddDishScreen'>;
type AddDishScreenRouteProp = RouteProp<RootStackParamList, 'AddDishScreen'>;

interface MenuItem {
    name: string;
    description: string;
    course: string;
    price: string;
}

interface AddDishScreenProps {
    navigation: AddDishScreenNavigationProp;
    route: AddDishScreenRouteProp;
}

const AddDishScreen: React.FC<AddDishScreenProps> = ({ navigation, route }) => {
    const { setMenuItems, setTotalItems } = route.params;
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [course, setCourse] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const addDish = () => {
        const newDish: MenuItem = { name, description, course, price };
        setMenuItems(prevItems => [...prevItems, newDish]);
        setTotalItems(prevCount => prevCount + 1);
        navigation.navigate('MenuScreen');
    };

    return (
        <ImageBackground source={require('../assets/Background.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Create a new dish</Text>
                <TextInput placeholder="Enter a name" style={styles.input} onChangeText={setName} value={name} />
                <TextInput placeholder="Enter Description" style={styles.input} onChangeText={setDescription} value={description} />
                <TextInput placeholder="Courses" style={styles.input} onChangeText={setCourse} value={course} />
                <TextInput placeholder="Enter Price" style={styles.input} keyboardType="numeric" onChangeText={setPrice} value={price} />
                <TouchableOpacity onPress={addDish} style={styles.button}>
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
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
    input: { borderWidth: 1, borderColor: '#000', padding: 8, marginVertical: 5 },
    button: { backgroundColor: '#8FBC8F', padding: 10, marginTop: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});

export default AddDishScreen;
