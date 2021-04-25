import React, { useEffect } from 'react';
import { ScrollView, View, Image, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import SimilarMovieTile from '../components/SimilarMovieTile';
import Loader from '../components/Loader';
import { MovieItemProps, IMovieItem } from '../types';
import { API_KEY, BASE_URL, LNG, PAGE } from '../constants';
import { setSimilar, useAppSelector, useAppDispatch } from '../store';

export default function MovieItem({route}: MovieItemProps) {
    const { movieId } = route.params;
    const movie: IMovieItem = useAppSelector(state => state.moviesList.movies.find((el: IMovieItem) => el.id === movieId))!;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(movie.similarMovies.length === 0) {
            axios.get(`${BASE_URL}movie/${movieId}/similar`, {params: {
                    api_key: API_KEY,
                    language: LNG,
                    page: PAGE
                }})
                .then(res => dispatch(setSimilar({id: movieId, movies: res.data.results})))
                .catch(err => console.warn(err));
        }
    }, [movieId]);

    return (
        <View style={styles.movieContainer}>
            <ScrollView>
                <Image source={{uri: movie.backdrop_path}} style={styles.movieImg} />
                <View style={styles.movieRating}>
                    <Text style={styles.movieRatingText}>{movie.vote_average}%</Text>
                </View>
                <View style={styles.movieInfoWrapper}>
                    <Text style={styles.movieYear}>{movie.release_date}</Text>
                    <Text style={styles.movieName}>{movie.title}</Text>
                    <Text style={styles.movieHeaders}>Overview:</Text>
                    <Text style={styles.movieOverview}>{movie.overview}</Text>
                    {movie.similarMovies.length === 0 ?
                        <Loader />
                        :
                        <>
                            <Text style={styles.movieHeaders}>Similar movies:</Text>
                            <FlatList data={movie.similarMovies}
                                      renderItem={({item}) => <SimilarMovieTile data={item} />}
                                      keyExtractor={item => item.id.toString()}
                                      horizontal={true}
                                      ItemSeparatorComponent={() => <View style={{width: 20}} />}
                            />
                        </>
                    }
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    movieContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#1C1C1C'
    },
    movieImg: {
        height: 240,
        width: '100%'
    },
    movieRating: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        backgroundColor: '#484848',
        position: 'absolute',
        top: 190,
        right: 30,
        borderRadius: 50
    },
    movieRatingText: {
        fontSize: 24,
        lineHeight: 28,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    movieInfoWrapper: {
        paddingTop: 16,
        paddingHorizontal: 24,
        paddingBottom: 50
    },
    movieYear: {
        fontSize: 18,
        lineHeight: 22,
        marginBottom: 6,
        color: '#FFFFFFE3'
    },
    movieName: {
        fontSize: 24,
        lineHeight: 34,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#FFFFFFE3'
    },
    movieHeaders: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#FFFFFFE3',
        textTransform: 'uppercase'
    },
    movieOverview: {
        fontSize: 18,
        lineHeight: 22,
        marginBottom: 30,
        color: '#FFFFFFE3'
    }
});