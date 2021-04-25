import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { IMovieTile } from '../types';

export default function MovieTile({data, onPress} : IMovieTile) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.tile}>
            <ImageBackground source={{uri: data.poster_path}} style={styles.tileImg} imageStyle={{borderRadius: 15}}>
                <View style={styles.tileBottomWrapper}>
                    <Text style={styles.tileHeader}>{data.title}</Text>
                    <Text style={styles.tileYear}>{data.release_date}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tile: {
        height: 200,
        width: '45%',
        borderRadius: 15,
        shadowColor: '#000000',
        // For IOS only
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    tileImg: {
        height: 200,
        width: '100%'
    },
    tileBottomWrapper: {
        paddingTop: 10,
        paddingHorizontal: 12,
        paddingBottom: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginTop: 'auto',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    tileHeader: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: 'bold'
    },
    tileYear: {
        fontSize: 12,
        lineHeight: 14
    }
});