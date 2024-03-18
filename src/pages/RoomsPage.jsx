import styled from "styled-components"
import data from '../data/rooms.json'
import { useEffect, useState } from "react"
import { colors } from "../styles/colors"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { RoomsTable } from "../components/Tables/RoomsTable"
import { useDispatch, useSelector } from "react-redux"
import { getRoomsData, getRoomsError, getRoomsStatus } from "../features/rooms/roomsSlice"
import { roomListThunk } from "../features/rooms/roomsThunk"
import { GreenBtnStyled } from "../components/Button/BtnStyled"
import { useNavigate } from "react-router-dom"



export const Rooms = () => {
    const roomsData = useSelector(getRoomsData)
    const roomsDataStatus = useSelector(getRoomsStatus)
    const roomsDataError = useSelector(getRoomsError)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    
    const [ rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const rows = 4;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedRows = rooms.slice(firstPage, LastPage)
    const totalPages = Math.ceil(rooms.length / rows);

    const [filter, setFilter] = useState('none')




    useEffect(() =>{
        let newRooms = []
        if(roomsDataStatus === 'idle'){
            dispatch(roomListThunk())
        } else if (roomsDataStatus === 'pending'){
            console.log(roomsDataStatus)

        } else if (roomsDataStatus === 'fulfilled'){
            if (filter === 'available'){
                newRooms = roomsData.filter((room) => room.status === "available" )
            }else if(filter === 'booked'){
                newRooms = roomsData.filter((room) => room.status === "booked" )
            }else{
                newRooms = [...roomsData]
                
            }
            
            setRooms(newRooms)
        } else if (roomsDataStatus === 'rejected'){
            console.log(roomsDataError)
        }
        
    },[dispatch, roomsDataStatus, roomsData, filter])

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

      const handleNew = () => {
        navigator('/rooms/newroom')
    }

    const handleFilter = (option) => {
        setFilter(option);
      };

    return (
        <>
            <RoomsContainer>
                <RoomsMenu>
                    <TabMenu>
                        
                        <TabElement onClick={()=> handleFilter("none")}>
                            All Rooms
                        </TabElement>
                        <TabElement onClick={()=> handleFilter("available")}>
                            Available Rooms
                        </TabElement>
                        <TabElement onClick={()=> handleFilter("booked")}>
                            Booked Rooms
                        </TabElement>
                    </TabMenu>
                    <GreenBtnStyled onClick={handleNew}>+ New Room</GreenBtnStyled>
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
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</GreenBtnStyled>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</GreenBtnStyled>
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
    justify-content: flex-start;
    width: 100%;
`

const TabMenu = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    width: 85%;
    align-items: flex-end;
`
const TabElement = styled.li`
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${colors.grey2};
    border-bottom: 1px solid ${colors.grey2};
    width: 11em;
        &:hover{
            color: ${colors.hardGreen};
            border-bottom: 2px solid ${colors.hardGreen};
        }
        &:active{
            color: ${colors.hardGreen};
            border-bottom: 2px solid ${colors.hardGreen};
        }
    `