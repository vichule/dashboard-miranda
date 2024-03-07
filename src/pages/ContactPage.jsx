import styled from "styled-components"
import { SwiperReview } from "../components/Swipers/SwiperReview"
import { ContactTable } from "../components/Tables/ContactTable"
import data from '../data/comments.json'
import { useState } from "react"
import { colors } from "../styles/colors"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"



export const Contact = () => {

    const [ contacts, setContacts] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)

    const rows = 4;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedRows = contacts.slice(firstPage, LastPage)
    const totalPages = Math.ceil(contacts.length / rows);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    return (
        <>
            <ContactContainer>
                <TopContainer>
                    <SwiperReview/>
                </TopContainer>
            </ContactContainer>
            <BotContainer>
                <ContactMenu>
                    <h2> All Contacts </h2>
                    <h2> Archived </h2>
                </ContactMenu>
            <TableStyled>
                <thead>
                        <tr>
                            <TdStyled>Date & Id</TdStyled>
                            <TdStyled>Customer, Email & Phone</TdStyled>
                            <TdStyled>Subject & Comment</TdStyled>
                            <TdStyled>Action</TdStyled>
                        </tr>
                </thead>
                <tbody>
                    <ContactTable data={displayedRows}/>
                </tbody>
                
            </TableStyled>
            <div>
                    <button onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</button>
                    <button onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</button>
            </div>
            </BotContainer>
        </>
    )
}


const TopContainer = styled.div`
    max-height: 30rem;
    width: 100%;
    max-width: 140rem;  
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`

const ContactContainer = styled.div`
    padding: 3em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2em;
`

const BotContainer = styled.div`
    padding: 0em 3em;
`

const ContactMenu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 10%;
    
    h2{
        cursor: pointer;
    }
`

