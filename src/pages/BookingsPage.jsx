import styled from "styled-components"
import data from '../data/bookings.json'
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { BookingsTable } from "../components/Tables/BookingsTable"
import { useState } from "react"



export const Bookings = () => {

    const [ bookings, setBookings] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)

    const rows = 10;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedBookings = bookings.slice(firstPage, LastPage)
    const totalPages = Math.ceil(bookings.length / rows);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };


    return (
        <>
            <BookingsContainer>
            <BookingsMenu>
                <h2> All Bookings </h2>
                <h2> Checking In </h2>
                <h2> Checking Out </h2>
                <h2> In Progress </h2>
            </BookingsMenu>
            <TableStyled>
                <thead>
                        <tr>
                            <TdStyled>Guest</TdStyled>
                            <TdStyled>Order Date</TdStyled>
                            <TdStyled>Check In</TdStyled>
                            <TdStyled>Check Out</TdStyled>
                            <TdStyled>Special Request</TdStyled>
                            <TdStyled>Room Type</TdStyled>
                            <TdStyled>Status</TdStyled>
                        </tr>
                </thead>
                <tbody>
                    <BookingsTable data={displayedBookings}/>
                </tbody>
                
            </TableStyled>
            <div>
                    <button onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</button>
                    <button onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
            </BookingsContainer>
        </>
    )
}

const BookingsContainer = styled.div`
    padding: 3em;
`

const BookingsMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 25%;
    
    h2{
        cursor: pointer;
    }
`