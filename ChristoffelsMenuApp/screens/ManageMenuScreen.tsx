import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface MenuItem {
    name: string;
    description: string;
    course: string;
    price: string;
}

interface ManageMenuScreenProps {
    navigation: any;
    route: {
        params: {
            setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
            setTotalItems: React.Dispatch<React.SetStateAction<number>>;
        };
    };
}

const ManageMenuScreen: React.FC<ManageMenuScreenProps> = ({ navigation, route }) => {
    const { setMenuItems, setTotalItems } = route.params;
    const [menuItems, setLocalMenuItems] = useState<MenuItem[]>([]);
    const [newItem, setNewItem] = useState<MenuItem>({ name: '', description: '', course: '', price: '' });

    const addItem = () => {
        if (newItem.name && newItem.description && newItem.price) {
            setLocalMenuItems([...menuItems, newItem]);
            setNewItem({ name: '', description: '', course: '', price: '' });
        }
    };

    const removeItem = (index: number) => {
        const updatedItems = menuItems.filter((_, i) => i !== index);
        setLocalMenuItems(updatedItems);
    };

    const saveChanges = () => {
        setMenuItems(menuItems);
        setTotalItems(menuItems.length);
        navigation.navigate('MenuScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Menu</Text>
            <FlatList
                data={menuItems}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
                            <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TextInput placeholder="Name" onChangeText={(text) => setNewItem({ ...newItem, name: text })} />
            <TouchableOpacity onPress={addItem}>
                <Text>Add Item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveChanges}>
                <Text>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    card: { padding: 10, borderBottomWidth: 1 },
    removeButton: { padding: 5, backgroundColor: 'red' },
    removeText: { color: 'white' },
});

export default ManageMenuScreen;
