import { useState } from "react"
import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"

const Layout = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) ?? {}
  )

  const addFavorite = (movie) => {
    const favoritesUpdated = { ...favorites, [movie.id]: movie }

    setFavorites(favoritesUpdated)
    localStorage.setItem("favorites", JSON.stringify(favoritesUpdated))
  }

  const removeFavorite = (id) => {
    const { [id]: removed, ...favoritesUpdated } = favorites

    setFavorites(favoritesUpdated)
    localStorage.setItem("favorites", JSON.stringify(favoritesUpdated))
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <div className="relative">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Outlet context={[favorites, addFavorite, removeFavorite]} />
      </motion.div>
    </div>
  )
}

export default Layout
