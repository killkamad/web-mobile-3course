import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';


class ChuckNorris extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            joke: null,
            cats: null,
            images: null,
        };
    }

    componentDidMount() {
        this.refreshRequest();
        this.requestImage();
    }

    refreshRequest() {
        fetch('https://cat-fact.herokuapp.com/facts')
            .then(response => response.json())
            .then(joke => this.setState({cats: joke.all.slice(0, 11)}))
            .catch(err => this.setState({joke: null}));
    }
    requestImage(){
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(joke => this.setState({images: joke[0].url}))
            .catch(err => this.setState({joke: null}));
    }


    renderListItem(item) {
        return (
            <View
                // style={styles.card}
            >
                <Image
                    source={{uri: this.state.images}}
                    style={{width: 150, height: 150}}
                />
                <Text>{item.text}</Text>
                <Text>{item.user.name.first} - {item.user.name.last}</Text>
            </View>);
    }

    render() {
        let item;
        if (this.state.cats) {
            console.log(this.state.cats);
            item = (
                <FlatList
                    data={this.state.cats}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => this.renderListItem(item)}
                />
            );
        } else {
            item = <Text>NO joke piss off</Text>;
        }
        return (
            <View>

                {item}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.refreshRequest()}
                >
                    <Text style={styles.buttonText}>Refresh</Text>
                </TouchableOpacity>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#BABABA',
        borderRadius: 15,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    image:{
        width: 100,
        height: 100,
    },
    card:{
        borderWidth: 1,
        borderColor:'black',
    }
});
export default ChuckNorris;