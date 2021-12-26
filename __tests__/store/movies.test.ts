import reducer, { 
  loadMoviesList, 
  likeMovie, 
  dislikeMovie, 
  moviesSlice, 
  deleteMovie, 
  setCategoriesFilters, 
  setItemsPerPage, 
  categoriesSelector, 
  filtredMoviesSelector 
} from "../../src/store/movies";
import mockMovies from '../../src/data/movies.json'

const initialState = moviesSlice.getInitialState()

describe("movies reducer", () => {
  it("should load movies list", () => {
    const state = reducer(initialState, loadMoviesList({ movies: mockMovies }));
    expect(state.list).toEqual(mockMovies)
  });

  it('should toggle like', () => {
    let state;
    const id = '1'

    state = reducer(initialState, loadMoviesList({ movies: mockMovies }));
    state = reducer(state, likeMovie({ id }))
    expect(state.likes[id]).toBe(true)
    expect(state.list[0].likes).toBe(mockMovies[0].likes + 1)

    state = reducer(state, likeMovie({ id }))
    expect(state.likes[id]).toBe(null)
    expect(state.list[0].likes).toBe(mockMovies[0].likes)

    state = reducer(state, likeMovie({ id }))
    state = reducer(state, dislikeMovie({ id }))
    expect(state.likes[id]).toBe(false)
    expect(state.list[0].likes).toBe(mockMovies[0].likes)
    expect(state.list[0].dislikes).toBe(mockMovies[0].dislikes + 1)
  })

  it('should toggle dislike', () => {
    let state;
    const id = '1'

    state = reducer(initialState, loadMoviesList({ movies: mockMovies }));
    state = reducer(state, dislikeMovie({ id }))
    expect(state.likes[id]).toBe(false)
    expect(state.list[0].dislikes).toBe(mockMovies[0].dislikes + 1)

    state = reducer(state, dislikeMovie({ id }))
    expect(state.likes[id]).toBe(null)
    expect(state.list[0].dislikes).toBe(mockMovies[0].dislikes)

    state = reducer(state, dislikeMovie({ id }))
    state = reducer(state, likeMovie({ id }))
    expect(state.likes[id]).toBe(true)
    expect(state.list[0].likes).toBe(mockMovies[0].likes + 1)
    expect(state.list[0].dislikes).toBe(mockMovies[0].dislikes)
  })

  it('should delete a movie', () => {
    let state;
    const id = '1';

    state = reducer(initialState, loadMoviesList({ movies: mockMovies }));
    state = reducer(state, deleteMovie({ id }))
    const finded = state.list.find((item) => item.id === id)

    expect(finded).toBeUndefined()
    expect(state.list.length).toBe(mockMovies.length - 1)
  })

  it('should set category filter', () => {
    let state;
    const category = 'action';

    state = reducer(initialState, setCategoriesFilters({ name: category }))
    expect(state.filters.categories[category]).toBe(category)
    state = reducer(state, setCategoriesFilters({ name: category }))
    expect(state.filters.categories[category]).toBeUndefined()
  })

  it('should set items per page', () => {
    let state;
    const itemsPerPage = 12;
    state = reducer(initialState, setItemsPerPage({ itemsPerPage }))
    expect(state.filters.itemsPerPage).toBe(itemsPerPage)
  })
});

describe('movies selector', () => {
  it('should select movies categories', () => {
    const state = reducer(initialState, loadMoviesList({ movies: mockMovies }))
    const categories = categoriesSelector({movies: state}).map(category => category.value)

    expect(categories.length).toBe(4)
    expect(categories).toContain('Comedy')
    expect(categories).toContain('Animation')
    expect(categories).toContain('Thriller')
    expect(categories).toContain('Drame')
  })

  it('should select filtered movies', () => {
    let state = reducer(initialState, loadMoviesList({ movies: mockMovies }))
    expect(filtredMoviesSelector({ movies: state }).length).toBe(10)

    state = reducer(state, setCategoriesFilters({ name: 'Comedy' }))
    expect(filtredMoviesSelector({ movies: state }).length).toBe(2)

    state = reducer(state, setCategoriesFilters({ name: 'Animation' }))
    expect(filtredMoviesSelector({ movies: state }).length).toBe(3)

    state = reducer(state, setCategoriesFilters({ name: 'Drame' }))
    expect(filtredMoviesSelector({ movies: state }).length).toBe(4)

    state = reducer(state, setCategoriesFilters({ name: 'Thriller' }))
    expect(filtredMoviesSelector({ movies: state }).length).toBe(10)
  })
})
