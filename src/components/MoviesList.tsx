import { useAppDispatch, useAppSelector } from "@hooks/store";
import {
  categoriesSelector,
  deleteMovie,
  dislikeMovie,
  filtredMoviesSelector,
  likeMovie,
  setCategoriesFilters,
  setItemsPerPage,
} from "@store/movies";

import Card from "@components/Card";
import Select from "@components/Select";
import Pagination from "@components/Pagination";
import { nanoid } from "nanoid";

const itemsPerPageSelect = [
  {
    id: nanoid(),
    value: "4",
  },
  {
    id: nanoid(),
    value: "8",
  },
  {
    id: nanoid(),
    value: "12",
  },
];

const MoviesList = () => {
  const { list, likes, filters } = useAppSelector((state) => state.movies);
  const filtredMovies = useAppSelector(filtredMoviesSelector);
  const categories = useAppSelector(categoriesSelector);
  const dispatch = useAppDispatch();

  const onLike = (id: string) => {
    dispatch(likeMovie({ id }));
  };

  const onDislike = (id: string) => {
    dispatch(dislikeMovie({ id }));
  };

  const onDelete = (id: string) => {
    dispatch(deleteMovie({ id }));
  };

  const handleCategorySelect = (name: string) => {
    dispatch(setCategoriesFilters({ name }));
  };

  const handleItemsPerPageSelect = (value: string) => {
    dispatch(setItemsPerPage({ itemsPerPage: +value }));
  };

  return (
    <section>
      {filtredMovies.length > 0 && (
        <div className="w-100 flex justify-around items-center p-5 mt-5">
          <Select
            label="Filtrer par catégories:"
            selected={filters.categories}
            multiple
            items={categories}
            onClick={(e) => handleCategorySelect(e.currentTarget.value)}
          />
          <Select
            label="Par page:"
            items={itemsPerPageSelect}
            onChange={(e) => handleItemsPerPageSelect(e.currentTarget.value)}
          />
        </div>
      )}
      <Pagination
        containerClassName="flex justify-center flex-wrap"
        data={filtredMovies}
        itemsPerPage={filters.itemsPerPage}
        renderItem={({ id, ...movie }) => (
          <Card
            key={id}
            id={id}
            isLiked={likes[id]}
            title={movie.title}
            category={movie.category}
            likes={movie.likes}
            dislikes={movie.dislikes}
            onLike={onLike}
            onDislike={onDislike}
            onDelete={onDelete}
          />
        )}
      />
      {!list.length && <p className="text-red-500 text-center">Pas de films</p>}
    </section>
  );
};

export default MoviesList;
