import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ISimilarMovieTile } from '../types';

export default function SimilarMovieTile({data} : ISimilarMovieTile) {
    return (
        <View style={styles.similarTile}>
            <Image source={{uri: data.backdrop_path}} style={styles.similarTileImg} />
            <Text style={styles.similarTileHeader}>{data.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    similarTile: {
        width: 327
    },
    similarTileImg: {
        height: 166,
        borderRadius: 17
    },
    similarTileHeader: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: 'bold',
        color: '#FFFFFFE3',
        textTransform: 'uppercase',
        marginTop: 16
    }
});