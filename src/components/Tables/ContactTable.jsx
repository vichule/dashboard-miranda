import { useDispatch } from 'react-redux'
import { TdText } from './StyledTable'
import { editCommentStatus, removeComment } from '../../features/contact/contactSlice'
import { DeleteIcon } from '../../styles/icons'
import { BtnArchive, BtnPublish } from '../Button/BtnStyled'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export const ContactTable = ({ data  }) => {
    let dataFiltered = ([])
    const dispatch = useDispatch()

    const handleDelete = (comment, event) =>{
        
        Swal.fire({
            title: "This will delete the comment",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeComment(comment))
              Swal.fire("Done!", "The comment has been deleted.", "success");
            }
          })
    }

    const handleEdit = (comment, event) =>{
       dispatch(editCommentStatus(comment.id))
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
                            {json.status ? <BtnPublish onClick={ (e) => handleEdit(json, e)}>Publish</BtnPublish> : <BtnArchive onClick={ (e) => handleEdit(json, e)}>Archive</BtnArchive>}
                        </td>
                        <td>
                            <DeleteIcon onClick={ (e) => handleDelete(json, e)}/>
                        </td>
                        
                    </tr>

            ))}
        </>
    )
}