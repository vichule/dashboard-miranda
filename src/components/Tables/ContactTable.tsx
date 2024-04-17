import { TdText } from './StyledTable'
// import { editCommentStatus } from '../../features/contact/contactSlice'
import { DeleteIcon } from '../../styles/icons'
import { BtnArchive, BtnPublish } from '../Button/BtnStyled'
import Swal from 'sweetalert2'
import { SubjectContainer, TdContainer } from './ContainersStyled'
import { ContactInterface } from '../../features/interfaces/interfaces'
import { useAppDispatch } from '../../app/hooks'
import { editCommentThunk, removeCommentThunk } from '../../features/contact/contactThunk'

interface CommentDataInterface{
    data: ContactInterface[]
}

export const ContactTable = ({ data  }: CommentDataInterface) => {
    let dataFiltered = ([])
    const dispatch = useAppDispatch()

    const handleDelete = (comment: ContactInterface, event: React.MouseEvent<SVGElement, MouseEvent>) =>{
        
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
                dispatch(removeCommentThunk(comment))
              Swal.fire("Done!", "The comment has been deleted.", "success");
            }
          })
    }

    const handleEdit = (comment: ContactInterface, event: React.MouseEvent<HTMLButtonElement, MouseEvent>, publish: boolean) =>{
       dispatch(editCommentThunk({ ...comment, status: publish }))
    }
    
    
    
    return(
        <>
            {data.map((json: ContactInterface) => (

                    <tr key={json._id}>
                        <TdContainer>
                            <h2>{json.date}</h2>
                            <p>#{json._id}</p>
                            </TdContainer>
                        <TdContainer>
                            <h2>{json.first_name} {json.last_name}</h2>
                            <p>{json.email}</p>
                            <p>{json.phone}</p>
                        </TdContainer>
                        <SubjectContainer>
                            <h2>{json.subject}</h2>
                            <TdText>{json.message}</TdText>
                        </SubjectContainer>
                        <TdContainer>
                            {json.status ? <BtnPublish onClick={ (e) => handleEdit(json, e, false)}>Publish</BtnPublish> : <BtnArchive onClick={ (e) => handleEdit(json, e, true)}>Archive</BtnArchive>}
                        </TdContainer>
                        <TdContainer>
                            <DeleteIcon onClick={ (e) => handleDelete(json, e)}/>
                        </TdContainer>
                        
                    </tr>

            ))}
        </>
    )
}

