import { useState } from "react"
import FallbackImage from "../assets/img/default.png"

const Image = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className={`${className} overflow-hidden relative`}>
      {loading && (
        <div className="w-full h-full bg-gray-200 animate-pulse absolute top-0 left-0"></div>
      )}
      <img
        src={src}
        onError={(e) => {
          e.target.src = FallbackImage
          setLoading(false)
        }}
        onLoad={() => setLoading(false)}
        alt={alt}
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-1000`}
      />
    </div>
  )
}

export default Image
