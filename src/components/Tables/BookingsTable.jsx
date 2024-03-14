import { useNavigate } from 'react-router-dom'
import { TdText } from './StyledTable'
import { DeleteIcon } from '../../styles/icons'
import { useDispatch } from 'react-redux'
import { removeBooking } from '../../features/bookings/bookingsSlice'
import { colors } from '../../styles/colors'
import styled from 'styled-components'
import { CancelStyled, CheckinStyled, CheckoutStyled, ProgressStyled, RowContainer, TdContainer } from './ContainersStyled'

export const BookingsTable = ({ data }) => {
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const handleInfo = (id) =>{
        navigator(`/bookings/booking/${id}`)
    }
    
    const handleDelete = (booking, e) =>{
        e.stopPropagation()
        dispatch(removeBooking(booking))
    }

    return(
        <>
            {data.map((json) => (

                    <RowContainer key={json.id} onClick={()=> handleInfo(json.id)}>
                        <TdContainer>
                            <h2>{json.first_name} {json.last_name}</h2>
                            <p>#{json.id}</p>
                            </TdContainer>
                        <TdContainer>
                            
                            <p>{json.order_date}</p>
                        </TdContainer>
                        <TdContainer>
                            <p>{json.check_in}</p>
                        </TdContainer>
                        <TdContainer>
                            <p>{json.check_out}</p>
                        </TdContainer>
                        <TdContainer>
                            <TdText>{json.notes}</TdText>
                        </TdContainer>
                        <TdContainer>
                            <p>{json.room_type}</p>
                        </TdContainer>
                        <TdContainer>
                            {json.status === 'Check-in' && <CheckinStyled>{json.status}</CheckinStyled>}
                            {json.status === 'Check-out' && <CheckoutStyled>{json.status}</CheckoutStyled>}
                            {json.status === 'In progress' && <ProgressStyled>{json.status}</ProgressStyled>}
                            {json.status === 'Cancelled' && <CancelStyled>{json.status}</CancelStyled>}
                            
                        </TdContainer>
                        <TdContainer>
                            <DeleteIcon onClick={ (e) => handleDelete(json, e)}/>
                        </TdContainer>
                    </RowContainer>

            ))}
        </>
    )
}





