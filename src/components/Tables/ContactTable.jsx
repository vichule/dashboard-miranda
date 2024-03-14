import { useDispatch } from 'react-redux'
import { TdText } from './StyledTable'
import { removeComment } from '../../features/contact/contactSlice'
import { DeleteIcon } from '../../styles/icons'

export const ContactTable = ({ data }) => {

    const dispatch = useDispatch()

    const handleDelete = (comment, event) =>{
        dispatch(removeComment(comment))
    }



    return(
        <>
            {data.map((json) => (

                    <tr key={json.id}>
                        <td>
                            <h2>{json.date}</h2>
                            <p>#{json.id}</p>
                            </td>
                        <td>
                            <h2>{json.first_name} {json.last_name}</h2>
                            <p>{json.email}</p>
                            <p>{json.phone}</p>
                        </td>
                        <td>
                            <h2>{json.subject}</h2>
                            <TdText>{json.message}</TdText>
                        </td>
                        <td>
                            <button>Publish</button>
                            <button>Archive</button>
                        </td>
                        <td>
                            <DeleteIcon onClick={ (e) => handleDelete(json, e)}/>
                        </td>
                        
                    </tr>

            ))}
        </>
    )
}