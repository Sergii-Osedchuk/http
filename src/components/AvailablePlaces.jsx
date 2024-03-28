import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorMessage from './ErrorMessage.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const responce = await fetch('http://localhost:5000/places');
        const resData = await responce.json();

        if (!responce.ok) {
          throw new Error('something went wrong');
        }

        setAvailablePlaces(resData.places);
      } catch(error) {
        setError(error);
      }

      setIsFetching(false);
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
