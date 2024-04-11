import styled from 'styled-components'
import { TdText } from './StyledTable'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '../../styles/icons'
import { useDispatch } from 'react-redux'
import { removeRoom } from '../../features/rooms/roomsSlice'
import { CheckinStyled, CheckoutStyled, RowContainer, SubjectContainer, TdContainer } from './ContainersStyled'
import Swal from 'sweetalert2'
import { RoomInterface } from '../../features/interfaces/interfaces'

interface RoomDataInterface{
    data: RoomInterface[]
}

export const RoomsTable = ({ data }: RoomDataInterface) => {

    const dispatch = useDispatch()
    const navigator = useNavigate()

    const handleInfo = (id: number) =>{
        navigator(`/rooms/room/${id}`)
    }
    
    const handleDelete = (room: RoomInterface, e: React.MouseEvent<SVGElement, MouseEvent>) =>{
        e.stopPropagation()
        Swal.fire({
            title: "This will delete the room",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeRoom(room))
              Swal.fire("Done!", "The room has been deleted.", "success");
            }
          })
        
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
                        <SubjectContainer>
                            <p>{json.amenities.join(', ')}</p>
                        </SubjectContainer>
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