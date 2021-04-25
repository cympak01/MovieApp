import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Loader() {
    return (
        <View style={styles.loaderContainer}>
            <Image style={styles.loaderImg} source={require('../assets/loading.gif')} />
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderImg: {
        height: 300,
        width: 300,
    }
});