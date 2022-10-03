import { useOutletContext } from "react-router-dom"
import Navbar from "../components/Navbar"
import FavoritesList from "../components/FavoritesList"

const Profile = () => {
  const [favorites, addFavorite, removeFavorite] = useOutletContext()

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 pt-4 px-8 lg:px-16">
        <h2 className="text-3xl font-bold">Favorites</h2>
        {Object.keys(favorites).length > 0 ? (
          <FavoritesList
            favorites={Object.values(favorites)}
            removeFavorite={removeFavorite}
          />
        ) : (
          <p>Start adding content to your list</p>
        )}
      </div>
    </>
  )
}

export default Profile
