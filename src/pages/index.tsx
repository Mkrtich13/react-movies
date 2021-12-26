import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Movie } from "@api/movies";
import { loadMoviesList } from "@store/movies";
import { useAppDispatch } from "@hooks/store";

import MoviesList from "@components/MoviesList";

type Props = {
  movies: Movie[];
};

const Home: NextPage<Props> = ({ movies }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadMoviesList({ movies }));
  }, [dispatch, movies]);

  return (
    <div>
      <Head>
        <title>React interview</title>
        <meta name="description" content="React" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-3 text-gray-700">
        <h1 className="text-3xl text-center font-bold">React Movies</h1>
        <MoviesList />
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/movies");
  const data = await res.json();
  return { props: { movies: data?.movies ?? [] } };
}

export default Home;
