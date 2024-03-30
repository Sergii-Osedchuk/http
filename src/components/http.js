export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:5000/places');
  const resData = await response.json();
  
  if (!response.ok) {
    throw new Error('something went wrong');
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:5000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'aplication/json',
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error ('Failed to update user data');
  }

  return resData.message;
}