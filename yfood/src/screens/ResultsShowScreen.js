import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, SafeAreaView } from 'react-native';
import zomato from '../api/zomato';

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');

    const getResult = async id => {
        const response = await zomato.get(`/restaurant?res_id=${id}`);
        setResult(response.data);
    };
    useEffect(() => {
        getResult(id);
    }, []);

    if (!result) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <SafeAreaView>
                    <Image style={styles.image} source={{ uri: result.thumb }} />
                    <Text style={styles.title}>{result.name}</Text>
                    <Text style={styles.name}>Средняя цена на двоих </Text>
                    <Text>{result.currency} {result.average_cost_for_two}</Text>
                    <Text style={styles.name}>Кухня </Text>
                    <Text>{result.cuisines}</Text>
                    <Text style={styles.name}>Время работы </Text>
                    <Text>{result.timings}</Text>
                    <Text style={styles.name}>Доп инфа -</Text>
                    <FlatList
                        data={result.highlights}
                        keyExtractor={it => it}
                        renderItem={({ item }) => {
                            return <Text>{item}</Text>;
                        }}
                    />
                </SafeAreaView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        padding:15,
        backgroundColor: '#eaedf5',
        borderRadius: 30,
    },
    image: {
        width: 'auto',
        height: 120,
        borderRadius: 4,
        marginVertical: 5
    },
    name: {
        fontWeight: 'bold',
        marginTop: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#f51524',
    }
});


export default ResultsShowScreen;