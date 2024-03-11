import styled from "styled-components"
import data from '../data/rooms.json'
import { useEffect, useState } from "react"
import { colors } from "../styles/colors"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { RoomsTable } from "../components/Tables/RoomsTable"
import { useDispatch, useSelector } from "react-redux"
import { getRoomsData, getRoomsError, getRoomsStatus } from "../features/rooms/roomsSlice"
import { roomListThunk } from "../features/rooms/roomsThunk"



export const Rooms = () => {
    const roomsData = useSelector(getRoomsData)
    const roomsDataStatus = useSelector(getRoomsStatus)
    const roomsDataError = useSelector(getRoomsError)
    const dispatch = useDispatch()
    
    const [ rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const rows = 4;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedRows = rooms.slice(firstPage, LastPage)
    const totalPages = Math.ceil(rooms.length / rows);


    useEffect(() =>{
        let newRooms = []
        if(roomsDataStatus === 'idle'){
            dispatch(roomListThunk())
        } else if (roomsDataStatus === 'pending'){
            console.log(roomsDataStatus)

        } else if (roomsDataStatus === 'fulfilled'){
            newRooms = [...roomsData]
            setRooms(newRooms)

        } else if (roomsDataStatus === 'rejected'){
            console.log(roomsDataError)
        }
        
    },[dispatch, roomsDataStatus, roomsData])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    return (
        <>
            <RoomsContainer>
                <RoomsMenu>
                    <h2> All Rooms </h2>
                    <h2> Available Rooms </h2>
                    <h2> Booked Rooms </h2>
                </RoomsMenu>
            <TableStyled>
                <thead>
                        <tr>
                            <TdStyled>Room Name</TdStyled>
                            <TdStyled>Room Type</TdStyled>
                            <TdStyled>Room Floor</TdStyled>
                            <TdStyled>Amenities</TdStyled>
                            <TdStyled>Price</TdStyled>
                            <TdStyled>Status</TdStyled>
                            <TdStyled>Options</TdStyled>
                        </tr>
                </thead>
                <tbody>
                    <RoomsTable data={displayedRows} />
                </tbody>
                
            </TableStyled>
            <div>
                    <button onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</button>
                    <button onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
            </RoomsContainer>
        </>
    )
}



const RoomsContainer = styled.div`
    padding: 3em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2em;
`

const RoomsMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 40%;
    
    h2{
        cursor: pointer;
    }
`
