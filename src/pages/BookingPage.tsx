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
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { BookingInterface, RoomInterface } from "../features/interfaces/interfaces"



export const BookingID = () =>{

    const roomsData = useAppSelector(getRoomsData)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    const booking = useAppSelector(getBookingData)
    const [ room, setRoom ] = useState<RoomInterface>()
    const handleBack = () =>{
        navigator(-1)
    }
    const [ spinner, setSpinner ] = useState<boolean>(true)
    let bookingRoom : RoomInterface = {} as RoomInterface

    const api = async () => {
        await dispatch(roomListThunk()).unwrap();
        await dispatch(bookingThunk(parseInt(id || ''))).unwrap();
        bookingRoom = roomsData.find((room) => room.id === booking?.room) || {} as RoomInterface
        setRoom(bookingRoom)
        if(room === bookingRoom){
            setSpinner(false)
        }
        
    }

    useEffect(() => {
        api();
        
        
    }, [api, id]);
    


    return(
        <>
            <MainContainer style={{padding: '1em'}}>
                <GreenBtnStyled onClick={handleBack}>Back</GreenBtnStyled>
                {spinner ? <p>Loading</p> : <BookingCard booking={booking as BookingInterface} room={room as RoomInterface}/>}
            </MainContainer>
            
        </>
    )
}

const MainContainer = styled.div`
    padding: 2em 1em 1em 2em;
    text-align: left;
`