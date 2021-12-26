// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import _movies from '@data/movies.json'

type ErrorResponse = {
  error: string;
}

export type Movie = {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
}

const movies$: Promise<Movie[]> = new Promise((resolve, reject) => setTimeout(resolve, 100, _movies))

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<{ movies: Movie[] } | ErrorResponse>
) {
  try {
    const movies = await movies$;
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).send({ error: "Movie request failed" })
  }
}
