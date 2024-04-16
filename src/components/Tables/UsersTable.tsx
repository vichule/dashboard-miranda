import styled from 'styled-components'
import { TdText } from './StyledTable'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../styles/colors'
import { BasicBtnStyled } from '../Button/BtnStyled'
import { UserInterface } from '../../features/interfaces/interfaces'

interface UserDataInterface{
    data: UserInterface[]
}

export const UsersTable = ({ data }: UserDataInterface) => {
    const navigator = useNavigate()
    const handleEdit = (id: string | undefined) =>{
        navigator(`/users/user/${id}`)
    }


    return(
        <>
            {data.map((json) => (

                    <tr key={json._id}>
                        <td style={{display: 'flex'}}>
                            <UserImgTable src={json.photo} alt="" />
                            <UserInfoText>
                                <h2>{json.first_name} {json.last_name}</h2>
                                <p>#{json._id}</p>
                                <p>{json.email}</p>
                                <p>{json.start_date}</p>
                            </UserInfoText>
                        </td>
                        <DescriptionTd>
                            <p>{json.description}</p>
                        </DescriptionTd>
                        <TdStyled>
                            <p>{json.phone}</p>
                        </TdStyled>
                        <TdStyled>
                            {json.status === 'Active' ? <StatusActive>{json.status}</StatusActive> : <StatusInactive>{json.status}</StatusInactive>}
                        </TdStyled>
                        <td>
                            <BasicBtnStyled onClick={()=> handleEdit(json._id)}>Edit</BasicBtnStyled>
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
    margin-right: 1em;
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

const TdStyled = styled.td`
    padding: 1em;
    width: 34em;
    text-align: center;
`

const DescriptionTd = styled.td`
    padding: 0em 0em 5em 2em;
    text-align: left;
    width: 34em;
`
