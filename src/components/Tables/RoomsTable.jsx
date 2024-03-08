import styled from 'styled-components'
import { TdText } from './StyledTable'

export const RoomsTable = ({ data }) => {



    return(
        <>
            {data.map((json) => (

                    <tr key={json.id}>
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
                            <TdText>{json.price}</TdText>
                        </td>
                        <td>
                            <p>{json.status}</p>
                        </td>
                        <td>
                            <p>*--*</p>
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