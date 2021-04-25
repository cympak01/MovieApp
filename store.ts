import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { IMovieItem, IBaseMovieItem } from './types';
import { IMG_URL } from './constants';

export const moviesListSlice = createSlice({
    name: 'moviesList',
    initialState: {
        movies: [] as IMovieItem[]
    },
    reducers: {
        setMovies: (state, action) => {
            let moviesArr : IMovieItem[] = [];

            action.payload.map((item : IMovieItem) => {
                const { id, poster_path, title, release_date, backdrop_path, vote_average, overview } = item;
                const release_year = new Date(release_date).getFullYear().toString();
                const movieItem : IMovieItem = {
                    id,
                    poster_path: `${IMG_URL}${poster_path}`,
                    title,
                    release_date: release_year,
                    backdrop_path: `${IMG_URL}${backdrop_path}`,
                    vote_average: vote_average * 10,
                    overview,
                    similarMovies: []
                };

                return moviesArr.push(movieItem);
            });

            state.movies = moviesArr;
        },
        setSimilar: (state, action) => {
            let similarMoviesArr: IBaseMovieItem[] = [];

            action.payload.movies.map((item : IBaseMovieItem) => {
                const { id, title, backdrop_path } = item;
                const movieItem : IBaseMovieItem = {
                    id,
                    title,
                    backdrop_path: `${IMG_URL}${backdrop_path}`
                };

                return similarMoviesArr.push(movieItem);
            });

            const movie: IMovieItem = state.movies.find((el: IMovieItem) => el.id === action.payload.id)!;

            movie.similarMovies = similarMoviesArr;
        }
    }
});

export const { setMovies, setSimilar } = moviesListSlice.actions;

export const store = configureStore({
    reducer: {
        moviesList: moviesListSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;