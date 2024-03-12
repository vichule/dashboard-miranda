import { useDispatch, useSelector } from "react-redux"
import { getBookingsData, getBookingsError, getBookingsStatus } from "../features/bookings/bookingsSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { bookingsListThunk } from "../features/bookings/bookingsThunk"
import { roomListThunk } from "../features/rooms/roomsThunk"
import { getRoomsData } from "../features/rooms/roomsSlice"



export const BookingID = () =>{

    const bookingsData = useSelector(getBookingsData)
    const bookingsDataError = useSelector(getBookingsError)
    const bookingsDataStatus = useSelector(getBookingsStatus)
    const roomsData = useSelector(getRoomsData)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const [ booking, setBooking ] = useState({})
    const [ room, setRoom ] = useState({})
    const handleBack = () =>{
        navigator(-1)
    }
    const [photos, setPhotos] = useState([])
    const [amenities, setAmenities] = useState([])


    useEffect(() => {
        let specificBooking = ({})
        let bookingRoom = ({})
        
        if (bookingsDataStatus === "idle") {
            dispatch(bookingsListThunk())
            dispatch(roomListThunk())
          } else if (bookingsDataStatus === "pending") {
           
          } else if (bookingsDataStatus === "fulfilled") {
            specificBooking = bookingsData.find((booking) => booking.id.toString() === id)
            bookingRoom = roomsData.find((room) => room.id.toString() === specificBooking.room.toString())
            setBooking(specificBooking)
            setRoom(bookingRoom)
            
            setPhotos(bookingRoom.photos)
            setAmenities(bookingRoom.amenities)
        } else if (bookingsDataStatus === 'rejected'){
            console.log(bookingsDataError)
        }
      }, [dispatch,bookingsDataStatus,bookingsData,roomsData,bookingsDataError])

    return(
        <>
            <div>
                <button onClick={handleBack}>Back</button>
                <h1>{booking.id}</h1>
                <div>
                    <h1>Guest</h1>
                    <p>{booking.first_name} {booking.last_name}</p>
                    <p>ID #{booking.id}</p>
                </div>
                <div>
                    <h1>Check In</h1>
                    <p>{booking.check_in}</p>
                </div>
                <div>
                    <h1>Check Out</h1>
                    <p>{booking.check_out}</p>
                </div>
                <div>
                    <h1>Notes</h1>
                    <p>{booking.notes}</p>
                </div>
                <div>
                    <div>
                        <div>
                            <h1>Room Info</h1>
                            <p>{room.room_number}</p>
                            <p>{room.room_type}</p>
                        </div>
                        
                        <div>
                            <h1>Price</h1>
                            <p>${room.price} /Night</p>
                        </div>
                    </div>
                    <p>{room.description}</p>
                    <div>
                        <h1>Facilities</h1>
                        {amenities.map((element, index) => (
                                <p key={index}>{element}</p>
                            ))}
                    </div>
                    <div>
                        <img src={photos[0]} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}