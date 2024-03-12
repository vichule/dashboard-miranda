import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRoomsData, getRoomsError, getRoomsStatus } from "../features/rooms/roomsSlice"
import { roomListThunk } from "../features/rooms/roomsThunk"



export const RoomID = () =>{

    const roomsData = useSelector(getRoomsData)
    const roomsDataError = useSelector(getRoomsError)
    const roomsDataStatus = useSelector(getRoomsStatus)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const [ room, setRoom ] = useState({  })
    const [amenities, setAmenities] = useState([])
    const [photos, setPhotos] = useState([])

    const handleBack = () =>{
        navigator(-1)
    }

    useEffect(() => {
        let specificRoom = ({})
        if (roomsDataStatus === "idle") {
            dispatch(roomListThunk())
          } else if (roomsDataStatus === "pending") {
           
          } else if (roomsDataStatus === "fulfilled") {
            specificRoom = roomsData.find((room) => room.id.toString() === id)
            setRoom(specificRoom)
            setAmenities(specificRoom.amenities)
            setPhotos(specificRoom.photos)
        } else if (roomsDataStatus === 'rejected'){
            console.log(roomsDataError)
        }
      }, [dispatch,roomsDataStatus,roomsData])

    return(
        <>
            <div>
            <button onClick={handleBack}>Back</button>
                <h1>Room ID: {room.id}</h1>
                <h1>Room Type: {room.room_type}</h1>
                <p>{room.room_number}</p>
                <h1>Price</h1>
                <p>{room.price} /Night</p>
                <h1>Description of the Room</h1>
                <p>{room.description}</p>
                <h1>Facilities</h1>
                {amenities.map((element, index) => (
                                <p key={index}>{element}</p>
                            ))}
                <div>
                    <img src={photos[0]} alt="" />
                </div>
            </div>
        </>
    )
}