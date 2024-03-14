import styled from 'styled-components'
import { TdText } from './StyledTable'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '../../styles/icons'
import { useDispatch } from 'react-redux'
import { removeRoom } from '../../features/rooms/roomsSlice'
import { CheckinStyled, CheckoutStyled, RowContainer, TdContainer } from './ContainersStyled'

export const RoomsTable = ({ data }) => {

    const dispatch = useDispatch()
    const navigator = useNavigate()

    const handleInfo = (id) =>{
        navigator(`/rooms/room/${id}`)
    }
    
    const handleDelete = (room, e) =>{
        e.stopPropagation()
        dispatch(removeRoom(room))
    }

    return(
        <>
            {data.map((json) => (

                    <RowContainer key={json.id} onClick={()=> handleInfo(json.id)}>
                        <TdContainer style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <RoomsImgStyled src={json.photos[0]} alt="" />
                            <div>
                                <p>#{json.id}</p>
                                <h2>{json.room_number}</h2>
                            </div>
                        </TdContainer>
                        <TdContainer>
                            <p>{json.room_type}</p>
                        </TdContainer>
                        <TdContainer>
                            <p>Floor 1</p>
                        </TdContainer>
                        <TdContainer>
                            <p>{json.amenities.join(', ')}</p>
                        </TdContainer>
                        <TdContainer>
                            <TdText>{json.price}/Night</TdText>
                        </TdContainer>
                        <TdContainer>
                            {json.status === 'available' && <CheckinStyled>{json.status}</CheckinStyled>}
                            {json.status === 'booked' && <CheckoutStyled>{json.status}</CheckoutStyled>}
                        </TdContainer>
                        <TdContainer>
                            <DeleteIcon onClick={ (e) => handleDelete(json, e)}/>
                        </TdContainer>
                    </RowContainer>

            ))}
        </>
    )
}

const RoomsImgStyled = styled.img`
    width: 200px;
    height: 150px;
    border-radius: 2em;
`