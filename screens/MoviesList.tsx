import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Loader from '../components/Loader';
import MovieTile from '../components/MovieTile';
import { MoviesListProps } from '../types';
import { BASE_URL, API_KEY, LNG, PAGE } from '../constants';
import { setMovies, useAppSelector, useAppDispatch } from '../store';

export default function MoviesList({navigation}: MoviesListProps) {
    const list = useAppSelector(state => state.moviesList.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.get(`${BASE_URL}discover/movie`, {params: {
                api_key: API_KEY,
                language: LNG,
                sort_by: 'popularity.desc',
                include_adult: false,
                include_video: false,
                page: PAGE
            }})
            .then(res => dispatch(setMovies(res.data.results)))
            .catch(err => console.warn(err));
    }, []);

    return (
        <View style={{flex: 1}}>
            {list.length === 0 ?
                <Loader />
                :
                <>
                    <FlatList data={list}
                              renderItem={({item}) => <MovieTile data={item} onPress={() => navigation.navigate('MovieItem', {movieId: item.id})} />}
                              keyExtractor={item => item.id.toString()}
                              ListHeaderComponent={<Text style={styles.listHeaderText}>Movies</Text>}
                              ListHeaderComponentStyle={styles.listHeader}
                              horizontal={false}
                              numColumns={2}
                              columnWrapperStyle={styles.listContainer}
                    />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    listHeader: {
        paddingTop: 72,
        paddingHorizontal: 32,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF'
    },
    listHeaderText: {
        fontFamily: 'Roboto',
        fontSize: 24,
        lineHeight: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    listContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF'
    }
});