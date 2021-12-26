import { nanoid } from 'nanoid';

import { RootState } from './index';
import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Movie } from '@api/movies';

type Category = {
  id: string
  value: string
}

type Likes = {
  [id: string]: boolean | null
}

type Filter = {
  categories: {
    [name: string]: string
  },
  itemsPerPage: number;
}

type InitialState = {
  list: Movie[]
  likes: Likes
  currentPage: number;
  totalPage: number;
  filters: Filter
}

const initialState: InitialState = {
  list: [],
  likes: {},
  currentPage: 0,
  totalPage: 0,
  filters: {
    itemsPerPage: 4,
    categories: {}
  },
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    loadMoviesList: (state, { payload }: PayloadAction<{ movies: Movie[] }>) => {
      state.list = payload.movies
    },
    likeMovie: (state, { payload }: PayloadAction<{ id: string }>) => {
      const { id } = payload
      const index = state.list.findIndex(movie => movie.id === id)
      if (state.likes[id]) {
        state.likes[id] = null;
        state.list[index].likes--
        return
      }
      if (state.likes[id] === false) {
        state.list[index].dislikes--
      }
      state.likes[id] = true
      state.list[index].likes++
    },
    dislikeMovie: (state, { payload }: PayloadAction<{ id: string }>) => {
      const { id } = payload
      const index = state.list.findIndex(movie => movie.id === id)
       if (state.likes[id] === false) {
        state.likes[id] = null;
        state.list[index].dislikes--
        return
      }
      if (state.likes[id]) {
        state.list[index].likes--
      }
      state.likes[id] = false
      state.list[index].dislikes++
    },
    deleteMovie: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.list = state.list.filter(movie => movie.id !== payload.id)
    },
    setCategoriesFilters: (state, { payload }: PayloadAction<{ name: string }>) => {
      const { name } = payload
      if (state.filters.categories[name]) {
        Reflect.deleteProperty(state.filters.categories, name);
        return
      }
      state.filters.categories[name] = name
    },
    setItemsPerPage: (state, { payload }: PayloadAction<{ itemsPerPage: number; }>) => {
      state.filters.itemsPerPage = payload.itemsPerPage
    }
  },
})

export const selectMoviesList = (state: RootState) => state.movies.list
export const selectMoviesFilters = (state:RootState) => state.movies.filters

const categoriesSelector = createDraftSafeSelector(
  selectMoviesList,
  (movies): Category[] => {
    const uniqueCategories = [...new Set(movies.map(movie => movie.category))]
    return uniqueCategories.map((category) => ({
      id: nanoid(),
      value: category
    }))
  }
)

const filtredMoviesSelector = createDraftSafeSelector(
  [selectMoviesList, selectMoviesFilters],
  (movies, filters): Movie[] => {
    let filtredMovies: Movie[] = movies.filter(movie => filters.categories[movie.category])
    if (!filtredMovies.length) {
      filtredMovies = movies
    }
    return filtredMovies
  }
)

export { categoriesSelector, filtredMoviesSelector }

export const { loadMoviesList, likeMovie, dislikeMovie, deleteMovie, setCategoriesFilters, setItemsPerPage } = moviesSlice.actions

export default moviesSlice.reducer
