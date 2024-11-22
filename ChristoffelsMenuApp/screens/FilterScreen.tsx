import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';

type RootStackParamList = {
    FilterScreen: undefined;
    MenuScreen: { filteredItems: MenuItem[] };
};

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterScreen'>;
type FilterScreenRouteProp = RouteProp<RootStackParamList, 'FilterScreen'>;

interface MenuItem {
    name: string;
    description: string;
    course: string;
    price: string;
}

interface FilterScreenProps {
    navigation: FilterScreenNavigationProp;
    route: FilterScreenRouteProp;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
    const [courseFilter, setCourseFilter] = useState<string>('All');
    const [priceFilter, setPriceFilter] = useState<string>('');
    const [newDishName, setNewDishName] = useState<string>('');
    const [newDishDescription, setNewDishDescription] = useState<string>('');
    const [newDishCourse, setNewDishCourse] = useState<string>('Starter');
    const [newDishPrice, setNewDishPrice] = useState<string>('');
    
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // State for added dishes

    // Function to add a new dish
    const addNewDish = () => {
        if (newDishName && newDishDescription && newDishPrice) {
            const newItem: MenuItem = {
                name: newDishName,
                description: newDishDescription,
                course: newDishCourse,
                price: newDishPrice,
            };

            setMenuItems([...menuItems, newItem]);

            // Reset form fields
            setNewDishName('');
            setNewDishDescription('');
            setNewDishPrice('');
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    // Filter items based on course and price range
    const filteredItems = menuItems.filter(item => {
        const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
        const matchesPrice = priceFilter ? parseFloat(item.price) <= parseFloat(priceFilter) : true;
        return matchesCourse && matchesPrice;
    });

    const applyFilter = () => {
        navigation.navigate('MenuScreen', { filteredItems });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Filter Menu by Course and Price</Text>

            {/* DropDown for Course */}
            <Text style={styles.label}>Select Course:</Text>
            <Picker
                selectedValue={courseFilter}
                style={styles.picker}
                onValueChange={(itemValue) => setCourseFilter(itemValue)}
            >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Course" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
            </Picker>

            {/* TextInput for Price Range */}
            <Text style={styles.label}>Max Price (R):</Text>
            <TextInput
                style={styles.textInput}
                value={priceFilter}
                onChangeText={setPriceFilter}
                keyboardType="numeric"
                placeholder="Enter max price"
            />

            <TouchableOpacity onPress={applyFilter} style={styles.applyButton}>
                <Text style={styles.buttonText}>Apply Filter</Text>
            </TouchableOpacity>

            {/* Form for Adding New Dish */}
            <Text style={styles.title}>Add New Dish</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Dish Name"
                value={newDishName}
                onChangeText={setNewDishName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Dish Description"
                value={newDishDescription}
                onChangeText={setNewDishDescription}
            />
            <Picker
                selectedValue={newDishCourse}
                style={styles.picker}
                onValueChange={(itemValue) => setNewDishCourse(itemValue)}
            >
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main Course" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
            <TextInput
                style={styles.textInput}
                placeholder="Price (R)"
                value={newDishPrice}
                onChangeText={setNewDishPrice}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={addNewDish} style={styles.addButton}>
                <Text style={styles.buttonText}>Add Dish</Text>
            </TouchableOpacity>

            {/* Display Filtered Menu Items */}
            <FlatList
                data={filteredItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardText}>Price: R{item.price}</Text>
                        <Text style={styles.cardText}>Course: {item.course}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
    applyButton: {
        backgroundColor: '#8FBC8F',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 16,
    },
    cardDescription: {
        fontSize: 14,
        color: '#555',
    },
});

export default FilterScreen;
