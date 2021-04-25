import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    MoviesList: undefined;
    MovieItem: {movieId: number};
};

type MoviesListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MoviesList'>;

export type MoviesListProps = {
    navigation: MoviesListScreenNavigationProp;
};

type MovieItemScreenRouteProp = RouteProp<RootStackParamList, 'MovieItem'>;

export type MovieItemProps = {
    route: MovieItemScreenRouteProp;
};

export interface IBaseMovieItem {
    id: number;
    title: string;
    backdrop_path: string;
};

export interface IMovieItem extends IBaseMovieItem {
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    similarMovies: IBaseMovieItem[]
};

export interface IMovieTile {
    data: {
        poster_path: string;
        title: string;
        release_date: string;
    };
    onPress: () => void;
};

export interface ISimilarMovieTile {
    data: IBaseMovieItem;
};