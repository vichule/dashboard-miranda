import styled from 'styled-components'
import { TdText } from './StyledTable'

export const UsersTable = ({ data }) => {



    return(
        <>
            {data.map((json) => (

                    <tr key={json.id}>
                        <td style={{display: 'flex'}}>
                            <UserImgTable src={json.photo} alt="" />
                            <UserInfoText>
                                <h2>{json.first_name} {json.last_name}</h2>
                                <p>#{json.id}</p>
                                <p>#{json.email}</p>
                                <p>#{json.start_date}</p>
                            </UserInfoText>
                        </td>
                        <td>
                            <p>{json.description}</p>
                        </td>
                        <td>
                            <p>{json.phone}</p>
                        </td>
                        <td>
                            <p>Active</p>
                        </td>
                        <td>
                            <p>*...*</p>
                        </td>
                    </tr>

            ))}
        </>
    )
}

const UserImgTable = styled.img`
    width: 8.5rem;
    height: 8.5rem;
    border-radius: 2rem;
`

const UserInfoText = styled.div`
    display: flex;
    flex-direction: column;
`