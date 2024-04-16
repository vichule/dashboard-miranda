import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { getRoomData, getRoomsData, getRoomsError, getRoomsStatus } from "../features/rooms/roomsSlice"
import { roomListThunk, roomThunk } from "../features/rooms/roomsThunk"
import { RoomCard } from "../components/ViewCards/RoomCard"
import { GreenBtnStyled } from "../components/Button/BtnStyled"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RoomInterface } from "../features/interfaces/interfaces"



export const RoomID = () =>{

    const roomsData = useSelector(getRoomsData)
    const roomsDataError = useSelector(getRoomsError)
    const roomsDataStatus = useSelector(getRoomsStatus)
    const room = useAppSelector(getRoomData)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    //const [ room, setRoom ] = useState({  })
 
    const [ spinner, setSpinner ] = useState(true)


    const handleBack = () =>{
        navigator(-1)
    }

    const api = async () => {
        await dispatch(roomThunk((id || ''))).unwrap();
        setSpinner(false)
    }

    useEffect(() => {
        api();
        
        
    }, [id]);


    return(
        <>
            <MainContainer style={{padding: '1em'}}>
                <GreenBtnStyled onClick={handleBack}>Back</GreenBtnStyled>
                {spinner ? <p>Loading</p> : <RoomCard room={room as RoomInterface} />}
            </MainContainer>
            
        </>
    )
}

const MainContainer = styled.div`
    padding: 2em 1em 1em 2em;
    text-align: left;
`