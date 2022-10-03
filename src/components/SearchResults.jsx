import MovieElement from "./MovieElement"

const SearchResults = ({ movies = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-8 pb-8">
      {movies.map((movie) => (
        <MovieElement key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default SearchResults
