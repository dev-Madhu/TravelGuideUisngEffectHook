import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import TravelPlace from '../TravelPlace'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

const TouristGuide = () => {
  const [apiResponse, setApiResponse] = useState({
    state: apiStatusConstants.initial,
    data: [],
  })

  useEffect(() => {
    setApiResponse({status: apiStatusConstants.inProgress, data: null})

    const getTravelPlaces = async () => {
      const apiUrl = 'https://apis.ccbp.in/tg/packages'
      const options = {
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()
      const responseData = fetchedData.packages.map(place => ({
        id: place.id,
        imageUrl: place.image_url,
        description: place.description,
        name: place.name,
      }))
      setApiResponse({
        status: apiStatusConstants.success,
        data: responseData,
      })
    }

    getTravelPlaces()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiResponse
    return (
      <div>
        <ul className="travel-data">
          {data.map(each => (
            <TravelPlace placeDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  const renderTravelBoard = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <div className="travel-board">
      <h1 className="travel-heading">Travel Guide</h1>
      {renderTravelBoard()}
    </div>
  )
}
export default TouristGuide
