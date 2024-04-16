import { BookingInterface, ContactInterface, RoomInterface, UserInterface } from "../features/interfaces/interfaces";

type allInterfaces = RoomInterface | BookingInterface | ContactInterface | UserInterface
const baseUrl = import.meta.env.VITE_API_BASEURL

export const apiCall = async (endpoint: string, method: string, body?: allInterfaces) => {
  //console.log(`Bearer ${localStorage.getItem('token')}`)
  const result = await fetch(`${baseUrl}/${endpoint}`, {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(body)
  });
  const response = await result.json();
  return await response
}