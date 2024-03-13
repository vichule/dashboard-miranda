import { useDispatch, useSelector } from "react-redux"
import { getBookingData, getBookingError, getBookingStatus, getBookingsData, getBookingsError, getBookingsStatus } from "../features/bookings/bookingsSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { bookingThunk, bookingsListThunk } from "../features/bookings/bookingsThunk"
import { roomListThunk, roomThunk } from "../features/rooms/roomsThunk"
import { getRoomData, getRoomsData } from "../features/rooms/roomsSlice"
import { BookingCard } from "../components/ViewCards/BookingCard"
import { BasicBtnStyled, GreenBtnStyled } from "../components/Button/BtnStyled"
import styled from "styled-components"



export const BookingID = () =>{

    const roomsData = useSelector(getRoomsData)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const booking = useSelector(getBookingData)
    const [ room, setRoom ] = useState([])
    const handleBack = () =>{
        navigator(-1)
    }
    const [ spinner, setSpinner ] = useState(true)
    let bookingRoom = ({})

    // useEffect(() => {
    //     let specificBooking = ({})
    //     let bookingRoom = ({})
        
    //     if (bookingsDataStatus === "idle") {
    //         dispatch(bookingsListThunk())
    //         dispatch(roomListThunk())
    //       } else if (bookingDataStatus === "pending") {
           
    //       } else if (bookingsDataStatus === "fulfilled") {
    //         specificBooking = bookingsData.find((room) => room.id.toString() === id)
    //         setRoom(specificRoom)
    //         bookingRoom = roomsData.find((room) => room.id.toString() === specificBooking.room.toString())
    //         setBooking(specificBooking)            
            
    //         setPhotos(bookingRoom.photos)
    //         setAmenities(bookingRoom.amenities)
    //     } else if (bookingsDataStatus === 'rejected'){
    //         console.log(bookingsDataError)
    //     }
    //   }, [dispatch, id, bookingsData])

    const api = useCallback(async () => {
        await dispatch(roomListThunk()).unwrap();
        await dispatch(bookingThunk(parseInt(id))).unwrap();
        bookingRoom = roomsData.find((room) => room.id === booking.room)
        setRoom(bookingRoom)
        if(room === bookingRoom){
            setSpinner(false)
        }
        
    }, [id, dispatch, room]);

    useEffect(() => {
        api();
        
        
    }, [api, id]);
    


    return(
        <>
            <MainContainer style={{padding: '1em'}}>
                <GreenBtnStyled onClick={handleBack}>Back</GreenBtnStyled>
                {spinner ? <p>Loading</p> : <BookingCard booking={booking} room={room}/>}
            </MainContainer>
            
        </>
    )
}

const MainContainer = styled.div`
    padding: 2em 1em 1em 2em;
    text-align: left;
`