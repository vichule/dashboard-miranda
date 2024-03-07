import data from '../../data/bookings.json'
import { TdText } from './StyledTable'

export const BookingsTable = ({ data }) => {



    return(
        <>
            {data.map((json) => (

                    <tr key={json.id}>
                        <td>
                            <h2>{json.first_name} {json.last_name}</h2>
                            <p>#{json.id}</p>
                            </td>
                        <td>
                            
                            <p>{json.order_date}</p>
                        </td>
                        <td>
                            <p>{json.date_in}</p>
                        </td>
                        <td>
                            <p>{json.date_out}</p>
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