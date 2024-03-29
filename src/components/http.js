export async function fetchAvailablePlaces() {
  const responce = await fetch('http://localhost:5000/places');
  const resData = await responce.json();
  
  if (!responce.ok) {
    throw new Error('something went wrong');
  }

  return resData.places;
}