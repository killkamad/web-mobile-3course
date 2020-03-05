import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, FlatList, Image} from 'react-native';
import yelp from "../api/yelp";

const ResultShowScreen = ({navigation}) => {
    const [images, changeImages] = useState(null);
    const id = navigation.getParam('id');


    console.log(images);
    const getResult = async id => {
        const response = await yelp.get(`/${id}`);
        changeImages(response.data)
    };

    useEffect(() => {
        getResult(id)
    }, []);

    if (!images) {
        return null;
    }
    return (
        <>
            <Text>{images.name}</Text>
            <FlatList
                data={images.photos}
                keyExtractor={photo => photo}
                renderItem={({item}) => {
                    return (
                        <Image
                            source={{uri: item}}
                            style={{width: 300, height: 200}}
                        />)
                }}
            />
        </>
    )
};

const styles = StyleSheet.create({});
export default ResultShowScreen;
