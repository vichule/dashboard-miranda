import { useNavigate } from 'react-router-dom'
import { TdText } from './StyledTable'
import { DeleteIcon } from '../../styles/icons'
import { useDispatch } from 'react-redux'
import { removeBooking } from '../../features/bookings/bookingsSlice'

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

                    <tr key={json.id} onClick={()=> handleInfo(json.id)}>
                        <td>
                            <h2>{json.first_name} {json.last_name}</h2>
                            <p>#{json.id}</p>
                            </td>
                        <td>
                            
                            <p>{json.order_date}</p>
                        </td>
                        <td>
                            <p>{json.check_in}</p>
                        </td>
                        <td>
                            <p>{json.check_out}</p>
                        </td>
                        <td>
                            <TdText>{json.notes}</TdText>
                        </td>
                        <td>
                            <p>{json.room_type}</p>
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