import styled from "styled-components"
import { useEffect, useState } from "react"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { RoomsTable } from "../components/Tables/RoomsTable"
import { getRoomsData, getRoomsError, getRoomsStatus } from "../features/rooms/roomsSlice"
import { roomListThunk } from "../features/rooms/roomsThunk"
import { GreenBtnStyled, OrderSelect } from "../components/Button/BtnStyled"
import { useNavigate } from "react-router-dom"
import { TabElement, TabMenu } from "../components/Tabs/TabsStyled"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { RoomInterface } from "../features/interfaces/interfaces"



export const Rooms = () => {
    const roomsData = useAppSelector(getRoomsData)
    const roomsDataStatus = useAppSelector(getRoomsStatus)
    const roomsDataError = useAppSelector(getRoomsError)
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    
    const [ rooms, setRooms] = useState<RoomInterface[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    const rows = 4;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedRows = rooms.slice(firstPage, LastPage)
    const totalPages = Math.ceil(rooms.length / rows);

    const [filter, setFilter] = useState<string>('none')
    const [currentTab, setCurrenTab] = useState<string>('none')
    const [order, setOrder] = useState<string>('none');



    useEffect(() =>{
        let newRooms = []
        if(roomsDataStatus === 'idle'){
            dispatch(roomListThunk())
        } else if (roomsDataStatus === 'pending'){
            //console.log(roomsDataStatus)

        } else if (roomsDataStatus === 'fulfilled'){
            //console.log(roomsDataStatus)
            if (filter === 'available'){
                newRooms = roomsData.filter((room) => room.status === "Available" )
            }else if(filter === 'booked'){
                newRooms = roomsData.filter((room) => room.status === "Booked" )
            }else{
                newRooms = [...roomsData]
                
            }

            const orderedRooms = newRooms.sort((a, b) => {
                switch (order) {
                    case 'roomUp':
                        return a.room_number - b.room_number;
                    case 'roomDown':
                        return b.room_number - a.room_number;
                    case 'priceUp':
                        return a.price - b.price;
                    case 'priceDown':
                        return b.price - a.price;
                    default:
                        return a.room_number - b.room_number;
                }
            })

            
            setRooms(orderedRooms)
        } else if (roomsDataStatus === 'rejected'){
            console.log(roomsDataError)
        }
        
    },[dispatch, roomsDataStatus, roomsData, filter,order])

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
      };

      const handleNew = () => {
        navigator('/rooms/newroom')
    }

    const handleFilter = (option: string) => {
        setFilter(option);
        setCurrenTab(option)
    };

    const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setOrder(e.target.value)

    }

    return (
        <>
            <RoomsContainer>
                <RoomsMenu>
                    <TabMenu>
                        
                        <TabElement onClick={()=> handleFilter("none")} $isActive={currentTab === "none"}>
                            All Rooms
                        </TabElement>
                        <TabElement onClick={()=> handleFilter("available")} $isActive={currentTab === "available"}>
                            Available Rooms
                        </TabElement>
                        <TabElement onClick={()=> handleFilter("booked")} $isActive={currentTab === "booked"}>
                            Booked Rooms
                        </TabElement>
                    </TabMenu>
                    <GreenBtnStyled onClick={handleNew}>+ New Room</GreenBtnStyled>
                    <OrderSelect name="order" id="order" onChange={(e) => handleOrder(e)}>
                            <option value="roomUp">Room Number Asc</option>
                            <option value="roomDown">Room Number Desc</option>
                            <option value="priceUp">Cheapest</option>
                            <option value="priceDown">Expensive</option>
                            
                    </OrderSelect>
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
            <PaginationContainer>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</GreenBtnStyled>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</GreenBtnStyled>
            </PaginationContainer>
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
    width: 95%;
`



const PaginationContainer = styled.div`
    display: flex;
    gap: 5em;
`

