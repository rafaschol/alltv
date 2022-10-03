const getMovies = async (url, params, startIndex = 0, endIndex = 8) => {
  const paramsString = new URLSearchParams({
    ...params,
    api_key: import.meta.env.VITE_API_KEY
  }).toString()

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}${url}?${paramsString}`
  )
  const data = await res.json()

  return data.results.slice(startIndex, endIndex)
}

const getMoviesWithImages = async (
  url,
  params,
  startIndex = 0,
  endIndex = 5
) => {
  const paramsString = new URLSearchParams({
    ...params,
    api_key: import.meta.env.VITE_API_KEY
  }).toString()

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}${url}?${paramsString}`
  )
  const data = await res.json()
  const fetchedMovies = data.results.slice(startIndex, endIndex)

  const moviesPromises = fetchedMovies.map((fetchedMovie) =>
    getMovie(fetchedMovie.id)
  )
  const movies = await Promise.all(moviesPromises)

  return movies
}

const getMovie = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/movie/${id}?api_key=${
      import.meta.env.VITE_API_KEY
    }&append_to_response=images,videos&include_image_language=en,null`
  )
  const data = await res.json()

  return data
}

const getCast = async (movieId, startIndex = 0, endIndex = 8) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/movie/${movieId}/credits?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  )
  const data = await res.json()

  return data.cast.slice(startIndex, endIndex)
}

const search = async (query, startIndex, endIndex) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/search/movie?query=${query}&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  )
  const data = await res.json()

  return data.results.slice(startIndex, endIndex)
}

export { getMovies, getMoviesWithImages, getMovie, getCast, search }
