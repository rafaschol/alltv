import { useState, useCallback } from "react"
import debounce from "lodash.debounce"
import { HiSearch } from "react-icons/hi"
import Navbar from "../components/Navbar"
import SearchResults from "../components/SearchResults"
import { search } from "../api"

const Search = () => {
  const [results, setResults] = useState([])

  const searchDebounce = useCallback(
    debounce((query) => search(query).then((data) => setResults(data)), 500),
    []
  )

  const handleSearch = (e) => {
    if (e.target.value.length >= 3) {
      searchDebounce(e.target.value)
    } else {
      setResults([])
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-8 pt-4 px-8 lg:px-16">
        <div className="relative flex items-center">
          <HiSearch className="absolute ml-8 text-indigo-500 text-xl" />
          <input
            type="search"
            placeholder="Search"
            onChange={handleSearch}
            className="px-8 pl-16 py-4 w-full bg-indigo-50 text-indigo-500 rounded-full focus:outline-none"
          />
        </div>
        <SearchResults movies={results} />
      </div>
    </>
  )
}

export default Search
