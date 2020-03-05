import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ResultsDetail = ({item}) => {
    const {imageStyle, nameStyle, containerStyle} = styles;
    const {image_url, rating, review_count, name} = item;
    return (
        <View style={containerStyle}>
            <Image
                style={imageStyle}
                source={{uri: image_url}}
            />
            <Text style={nameStyle}>{name}</Text>
            <Text>{rating} Start, {review_count} Reviews</Text>
        </View>
    )

};


const styles = StyleSheet.create({
    containerStyle: {
        marginLeft: 15,
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderColor: 'black',
        borderRadius: 4,
        marginBottom: 5,
    },
    nameStyle: {
        fontWeight: 'bold',
    }
});

export default ResultsDetail;
