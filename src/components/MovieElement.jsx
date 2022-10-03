import { Link } from "react-router-dom"
import { HiStar } from "react-icons/hi"
import Image from "./Image"

const MovieElement = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="flex flex-col gap-2 hover:scale-105 transition-transform duration-300">
        <Image
          src={`${import.meta.env.VITE_MEDIA_URL}${movie.poster_path}`}
          alt={movie.title}
          className="aspect-[2/3] rounded-3xl"
        />
        <div>
          <h4 className="text-lg font-bold truncate">{movie.title}</h4>
          <div className="flex gap-1 items-center">
            <HiStar className="text-yellow-400" />
            <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieElement
