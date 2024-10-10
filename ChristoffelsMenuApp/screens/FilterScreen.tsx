import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    FilterScreen: undefined;
    MenuScreen: undefined;
};

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterScreen'>;

interface FilterScreenProps {
    navigation: FilterScreenNavigationProp;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
    const [course, setCourse] = useState<string>('');
    const [priceRange, setPriceRange] = useState<string>('');

    const applyFilter = () => {
        console.log(`Filtering by course: ${course}, price range: ${priceRange}`);
        navigation.goBack();
    };

    return (
        <ImageBackground source={require('../assets/Background.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Filter Menu</Text>
                <TextInput placeholder="Select Course" style={styles.input} onChangeText={setCourse} value={course} />
                <TextInput placeholder="Select Price Range" style={styles.input} onChangeText={setPriceRange} value={priceRange} />
                <TouchableOpacity onPress={applyFilter} style={styles.button}>
                    <Text style={styles.buttonText}>Confirm</Text>
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

export default FilterScreen;