import styled from 'styled-components'
import { TdText } from './StyledTable'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon, EditIcon } from '../../styles/icons'
import { useDispatch } from 'react-redux'
import { CheckinStyled, CheckoutStyled, RowContainer, SubjectContainer, TdContainer } from './ContainersStyled'
import Swal from 'sweetalert2'
import { RoomInterface } from '../../features/interfaces/interfaces'
import { removeRoomThunk } from '../../features/rooms/roomsThunk'
import { useAppDispatch } from '../../app/hooks'

interface RoomDataInterface{
    data: RoomInterface[]
}

export const RoomsTable = ({ data }: RoomDataInterface) => {

    const dispatch = useAppDispatch()
    const navigator = useNavigate()

    const handleInfo = (id: string | undefined) =>{
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
                dispatch(removeRoomThunk(room))
              Swal.fire("Done!", "The room has been deleted.", "success");
            }
          })
        
    }

    const handleEdit = (id: string | undefined, e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation()
        navigator(`/rooms/editroom/${id}`)
        console.log(id)
    }

    return(
        <>
            {data.map((json) => (

                    <RowContainer key={json._id} onClick={()=> handleInfo(json._id)}>
                        <TdContainer style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <RoomsImgStyled src={json.photos[0]} alt="" />
                            <div>
                                <p>#{json._id}</p>
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
                            {json.status === 'Available' && <CheckinStyled>{json.status}</CheckinStyled>}
                            {json.status === 'Booked' && <CheckoutStyled>{json.status}</CheckoutStyled>}
                        </TdContainer>
                        <TdContainer>
                            <EditIcon onClick={ (e) => handleEdit(json._id, e)}/>
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