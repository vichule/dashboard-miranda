import styled from 'styled-components'
import { TdText } from './StyledTable'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '../../styles/icons'
import { useDispatch } from 'react-redux'
import { removeRoom } from '../../features/rooms/roomsSlice'

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

                    <tr key={json.id} onClick={()=> handleInfo(json.id)}>
                        <td style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <RoomsImgStyled src={json.photos[0]} alt="" />
                            <div>
                                <p>#{json.id}</p>
                                <h2>{json.room_number}</h2>
                            </div>
                        </td>
                        <td>
                            <p>{json.room_type}</p>
                        </td>
                        <td>
                            <p>Floor 1</p>
                        </td>
                        <td>
                            <p>{json.amenities.join(', ')}</p>
                        </td>
                        <td>
                            <TdText>{json.price}/Night</TdText>
                        </td>
                        <td>
                            <p>{json.status}</p>
                        </td>
                        <td>
                            <DeleteIcon onClick={ (e) => handleDelete(json, e)}/>
                        </td>
                    </tr>

            ))}
        </>
    )
}

const RoomsImgStyled = styled.img`
    width: 200px;
    height: 150px;
    border-radius: 2em;
`