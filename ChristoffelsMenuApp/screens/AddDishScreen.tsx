import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface AddDishScreenProps {
    route: any;
    navigation: any;
}

const AddDishScreen: React.FC<AddDishScreenProps> = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('');
    const [price, setPrice] = useState('');

    const addDish = () => {
        const newDish = {
            name,
            description,
            course,
            price,
        };

        // Update the menu items in the parent screen (MenuScreen)
        route.params.setMenuItems((prevItems: any) => [...prevItems, newDish]);
        navigation.goBack();  // Go back to the menu screen after adding the dish
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Dish</Text>
            <TextInput
                style={styles.input}
                placeholder="Dish Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Course (Starter/Main/Dessert)"
                value={course}
                onChangeText={setCourse}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={addDish} style={styles.button}>
                <Text style={styles.buttonText}>Add Dish</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
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

export default AddDishScreen;
