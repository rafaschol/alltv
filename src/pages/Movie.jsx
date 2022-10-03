import { useState, useEffect } from "react"
import {
  useParams,
  useOutletContext,
  Link,
  useNavigate
} from "react-router-dom"
import { HiChevronLeft, HiOutlineHeart, HiHeart } from "react-icons/hi"
import ContentList from "../components/ContentList"
import VideoDialog from "../components/VideoDialog"
import Loading from "./Loading"
import { getCast, getMovie, getMovies } from "../api"
import { formatRuntime } from "../helpers"
import Image from "../components/Image"

const Movie = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [favorites, addFavorite, removeFavorite] = useOutletContext()

  const [movie, setMovie] = useState({})
  const [cast, setCast] = useState([])
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [modal, setModal] = useState(false)
  const [favorite, setFavorite] = useState(!!favorites[id]?.id)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMovie({})
    setCast([])
    setRecommendedMovies([])
    setModal(false)
    setFavorite(!!favorites[id]?.id)
    setLoading(true)

    const moviePromise = getMovie(id)
    const castPromise = getCast(id)
    const recommendedPromise = getMovies(`/movie/${id}/recommendations`)

    Promise.all([moviePromise, castPromise, recommendedPromise]).then(
      ([movieData, castData, recommendedData]) => {
        setMovie(movieData)
        setCast(castData)
        setRecommendedMovies(recommendedData)

        setLoading(false)
      },
      (rejected) => {
        navigate("/")
      }
    )
  }, [id])

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(id)
    } else {
      addFavorite(movie)
    }
    setFavorite(!favorite)
  }

  if (loading) return <Loading />

  return (
    <div className="flex flex-col gap-4 relative">
      <Link
        to="/"
        className="absolute z-30 top-12 left-12 lg:top-20 lg:left-20 text-xl p-3 rounded-full bg-indigo-50 text-indigo-500 opacity-75 hover:opacity-100 transition-opacity duration-200"
      >
        <HiChevronLeft />
      </Link>
      <div className="p-8 lg:p-16 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-12 lg:h-screen">
        <div className="h-full aspect-[2/3]">
          <Image
            src={`${import.meta.env.VITE_MEDIA_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-3xl lg:h-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="flex flex-wrap gap-2 text-indigo-500">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-indigo-50 px-2 py-1 rounded-xl"
              >
                {genre.name}
              </span>
            ))}
            {movie.release_date && (
              <span className="bg-indigo-50 px-2 py-1 rounded-xl">
                {movie.release_date?.split("-")[0]}
              </span>
            )}
            <span className="bg-indigo-50 px-2 py-1 rounded-xl">
              {formatRuntime(movie.runtime)}
            </span>
          </div>
          <p className="mb-2">{movie.overview}</p>

          <div className="flex gap-2">
            <button
              disabled={!movie.videos?.results.length}
              className="bg-indigo-500 text-indigo-50 text-xl px-10 py-2 rounded-full disabled:bg-indigo-300 hover:bg-indigo-600 transition-colors duration-300"
              onClick={() => setModal(true)}
            >
              Play
            </button>
            <button
              className="text-xl p-3 rounded-full bg-indigo-50 text-indigo-500 relative flex items-center justify-center hover:bg-indigo-100 transition-colors duration-300"
              onClick={toggleFavorite}
            >
              <HiOutlineHeart />
              <HiHeart
                className={`absolute transition-opacity duration-150 ${
                  favorite ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {cast.length > 0 && <ContentList type="cast" content={cast} />}
      {recommendedMovies.length > 0 && (
        <ContentList
          type="movies"
          title="Recommended movies"
          content={recommendedMovies}
        />
      )}

      {movie.videos?.results.length > 0 && (
        <VideoDialog
          video={`https://www.youtube.com/embed/${movie.videos?.results[0].key}`}
          isOpen={modal}
          close={() => setModal(false)}
        />
      )}
    </div>
  )
}

export default Movie
