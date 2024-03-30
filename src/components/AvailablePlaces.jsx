import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from './http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(position => {
          const sortedPlaces = sortPlacesByDistance(
            places, 
            position.coords.latitude, 
            position.coords.latitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch(error) {
        setError(error);
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorMessage title='An error occurred' message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fallbackText="No places available."
      loadingText='Fetching places...'
      onSelectPlace={onSelectPlace}
    />
  );
}
