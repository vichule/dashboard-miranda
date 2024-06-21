import styled from "styled-components"
import { SwiperReview } from "../components/Swipers/SwiperReview"
import { ContactTable } from "../components/Tables/ContactTable"
import { useEffect, useState } from "react"
import { TableStyled, TdStyled } from "../components/Tables/StyledTable"
import { getCommentsListData, getCommentsListError, getCommentsListStatus } from "../features/contact/contactSlice"
import { commentsListThunk } from "../features/contact/contactThunk"
import { GreenBtnStyled } from "../components/Button/BtnStyled"
import { TabElement, TabMenu } from "../components/Tabs/TabsStyled"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { ContactInterface } from "../features/interfaces/interfaces"



export const Contact = () => {
    const dispatch = useAppDispatch()
    const commentsData = useAppSelector(getCommentsListData)
    const commentsDataError = useAppSelector(getCommentsListError)
    const commentsDataStatus = useAppSelector(getCommentsListStatus)
    const [contacts, setContacts] = useState<ContactInterface[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    const rows = 4;
    const firstPage = (currentPage - 1) * rows
    const LastPage = firstPage + rows;
    let displayedRows = contacts.slice(firstPage, LastPage)
    const totalPages = Math.ceil(contacts.length / rows);

    const [filter, setFilter] = useState<boolean>(false)
    const [currentTab, setCurrenTab] = useState<boolean>(false)

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        let newComments = []
        if (commentsDataStatus === 'idle') {
            dispatch(commentsListThunk())
        } else if (commentsDataStatus === 'pending') {


        } else if (commentsDataStatus === 'fulfilled') {
            if (filter) {
                newComments = commentsData.filter((comment) => comment.status === true)
            } else {
                newComments = [...commentsData]
            }

            const orderedComments = newComments.sort((a, b) => {

                return new Date(a.date).getTime() - new Date(b.date).getTime();

            })

            setContacts(orderedComments)

        } else if (commentsDataStatus === 'rejected') {
            console.log(commentsDataError)
        }
    }, [dispatch, commentsData, commentsDataStatus, filter])

    const handleFilter = (option: boolean) => {
        setFilter(option);
        setCurrenTab(option)
    };





    return (
        <>
            <ContactContainer>
                <TopContainer>
                    <SwiperReview />
                </TopContainer>
            </ContactContainer>
            <BotContainer>
                <ContactMenu>
                    <TabMenu>
                        <TabElement onClick={() => handleFilter(false)} $isActive={currentTab === false}> All Contacts </TabElement>
                        <TabElement onClick={() => handleFilter(true)} $isActive={currentTab === true}> Archived </TabElement>
                    </TabMenu>

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
                        <ContactTable data={displayedRows} />
                    </tbody>

                </TableStyled>
                <PaginationContainer>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>Previous</GreenBtnStyled>
                    <GreenBtnStyled onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}>Next</GreenBtnStyled>
                </PaginationContainer>
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
    margin-bottom: 2em;
    
    
`


const PaginationContainer = styled.div`
    display: flex;
    gap: 5em;
    margin-bottom: 5em;
`