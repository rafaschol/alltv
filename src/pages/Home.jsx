import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import ContentList from "../components/ContentList"
import Loading from "./Loading"
import { getMovies, getMoviesWithImages } from "../api"
import { GENRES } from "../data"

const Home = () => {
  const [mainMovies, setMainMovies] = useState([])
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [moviesByGenre, setMoviesByGenre] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch movies for main carousel
    const mainMoviesPromise = getMoviesWithImages("/trending/movie/week")

    // Fetch recommended movies
    const recommendedMoviesPromise = getMovies("/discover/movie", {
      sort_by: "vote_count.desc"
    })

    // Fetch most popular movies
    const popularMoviesPromise = getMovies("/movie/popular")

    // Fetch movies by genre
    const genresPromises = GENRES.map(async (genre) => {
      const movies = await getMovies(
        "/discover/movie",
        {
          sort_by: "vote_count.desc",
          with_genres: genre.id
        },
        4,
        12
      )
      return { id: genre.id, name: genre.name, movies }
    })

    Promise.all([
      mainMoviesPromise,
      recommendedMoviesPromise,
      popularMoviesPromise,
      ...genresPromises
    ]).then(([main, recommended, popular, ...byGenre]) => {
      setMainMovies(main)
      setRecommendedMovies(recommended)
      setPopularMovies(popular)
      setMoviesByGenre(byGenre)

      setLoading(false)
    })
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <Navbar />
      <div className="flex flex-col pt-4">
        <ContentList
          type="movies"
          title="Recommended"
          content={recommendedMovies}
        />
        <ContentList
          type="movies"
          title="Most popular"
          content={popularMovies}
        />
        {moviesByGenre.map((genre) => (
          <ContentList
            key={genre.id}
            type="movies"
            title={genre.name}
            content={genre.movies}
          />
        ))}
      </div>
    </>
  )
}

export default Home
