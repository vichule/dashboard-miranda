import { useNavigate } from 'react-router-dom'
import { TdText } from './StyledTable'

export const BookingsTable = ({ data }) => {
    const navigator = useNavigate()

    const handleInfo = (id) =>{
        navigator(`/bookings/booking/${id}`)
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
                            <p>Minimal Deluxe</p>
                        </td>
                        <td>
                            <p>Check In</p>
                        </td>
                    </tr>

            ))}
        </>
    )
}