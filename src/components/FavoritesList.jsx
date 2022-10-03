import { Link } from "react-router-dom"
import {
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  SwipeAction,
  Type
} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import { HiStar, HiTrash } from "react-icons/hi"
import { formatRuntime } from "../helpers"

const FavoritesList = ({ favorites, removeFavorite }) => {
  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => removeFavorite(id)}
        className="bg-red-500 mb-4 ml-4 rounded-3xl"
      >
        <div className="aspect-square flex items-center justify-center">
          <HiTrash className="text-red-50 text-3xl" />
        </div>
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList fullSwipe type={Type.IOS}>
      {favorites.map((favorite) => (
        <SwipeableListItem
          key={favorite.id}
          trailingActions={trailingActions({ id: favorite.id })}
        >
          <FavoriteElement movie={favorite} />
        </SwipeableListItem>
      ))}
    </SwipeableList>
  )
}

const FavoriteElement = ({ movie }) => {
  return (
    <li className="bg-indigo-50 rounded-3xl flex gap-4 md:gap-8 items-center overflow-hidden mb-4 w-full">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`${import.meta.env.VITE_MEDIA_URL}${movie.poster_path}`}
          onError={(e) => (e.target.src = FallbackImage)}
          alt={movie.title}
          className="h-24 md:h-48 rounded-r-3xl object-cover"
        />
      </Link>
      <div className="min-w-0 grid md:gap-1">
        <Link
          to={`/movie/${movie.id}`}
          className="font-bold text-lg md:text-xl truncate"
        >
          {movie.title}
        </Link>
        <p>
          {formatRuntime(movie.runtime)}
          {movie.genres.length > 0 && (
            <span className="hidden md:inline">
              {" "}
              &#8213; {movie.genres.map((genre) => genre.name).join(" / ")}
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-1 items-center ml-auto pr-4 md:pr-8 lg:pr-16">
        <HiStar className="text-yellow-400 text-lg md:text-xl" />
        <span className="md:text-lg">{movie.vote_average.toFixed(1)}</span>
      </div>
    </li>
  )
}

export default FavoritesList
