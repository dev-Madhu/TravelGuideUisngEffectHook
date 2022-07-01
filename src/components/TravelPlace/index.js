import './index.css'

const TravelPlace = props => {
  const {placeDetails} = props

  const {name, imageUrl, description} = placeDetails

  return (
    <li className="place-card">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="heading">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default TravelPlace
