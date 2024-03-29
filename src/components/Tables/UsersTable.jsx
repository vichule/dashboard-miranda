import styled from 'styled-components'
import { TdText } from './StyledTable'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../styles/colors'
import { BasicBtnStyled } from '../Button/BtnStyled'

export const UsersTable = ({ data }) => {
    const navigator = useNavigate()
    const handleEdit = (id) =>{
        navigator(`/users/user/${id}`)
    }


    return(
        <>
            {data.map((json) => (

                    <tr key={json.id}>
                        <td style={{display: 'flex'}}>
                            <UserImgTable src={json.photo} alt="" />
                            <UserInfoText>
                                <h2>{json.first_name} {json.last_name}</h2>
                                <p>#{json.id}</p>
                                <p>{json.email}</p>
                                <p>{json.start_date}</p>
                            </UserInfoText>
                        </td>
                        <td>
                            <p>{json.description}</p>
                        </td>
                        <td>
                            <p>{json.phone}</p>
                        </td>
                        <td>
                            {json.status === 'Active' ? <StatusActive>{json.status}</StatusActive> : <StatusInactive>{json.status}</StatusInactive>}
                        </td>
                        <td>
                            <BasicBtnStyled onClick={()=> handleEdit(json.id)}>Edit</BasicBtnStyled>
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

const StatusActive = styled.p`
    color: ${colors.green};
    font-size: 2rem;
`

const StatusInactive = styled.p`
    color: ${colors.red};
    font-size: 2rem;
`