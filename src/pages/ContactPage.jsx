import styled from "styled-components"
import { SwiperReview } from "../components/Swipers/SwiperReview"
import { ContactTable } from "../components/Tables/ContactTable"
import data from '../data/comments.json'
import { useEffect, useState } from "react"
import { colors } from "../styles/colors"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { useDispatch, useSelector } from "react-redux"
import { getCommentsListData, getCommentsListError, getCommentsListStatus } from "../features/contact/contactSlice"
import { commentsListThunk } from "../features/contact/contactThunk"



export const Contact = () => {
    const dispatch = useDispatch()
    const commentsData = useSelector(getCommentsListData)
    const commentsDataError = useSelector(getCommentsListError)
    const commentsDataStatus = useSelector(getCommentsListStatus)
    const [ contacts, setContacts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const rows = 4;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    const displayedRows = contacts.slice(firstPage, LastPage)
    const totalPages = Math.ceil(contacts.length / rows);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    useEffect(() =>{
        let newComments = []
        if(commentsDataStatus === 'idle'){
            dispatch(commentsListThunk())
        }else if (commentsDataStatus === 'pending'){
        
            
        }else if(commentsDataStatus === 'fulfilled'){
            newComments = [...commentsData]
            setContacts(newComments)

        }else if(commentsDataStatus === 'rejected'){
            console.log(commentsDataError)
        }
    },[dispatch, commentsData, commentsDataStatus])

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

