import Image from "./Image"

const CastElement = ({ person }) => {
  return (
    <div className="flex flex-col gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
      <Image
        src={`${import.meta.env.VITE_MEDIA_URL}${person.profile_path}`}
        alt={person.name}
        className="aspect-[2/3] rounded-3xl"
      />
      <h4 className="text-lg font-bold truncate">{person.name}</h4>
    </div>
  )
}

export default CastElement
