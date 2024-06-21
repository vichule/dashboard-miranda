import { useNavigate } from 'react-router-dom'
import { TdText } from './StyledTable'
import { DeleteIcon, EditIcon } from '../../styles/icons'
import { CancelStyled, CheckinStyled, CheckoutStyled, ProgressStyled, RowContainer, SubjectContainer, TdContainer } from './ContainersStyled'
import Swal from 'sweetalert2'
import { BookingInterface } from '../../features/interfaces/interfaces'
import { removeBookingThunk } from '../../features/bookings/bookingsThunk'
import { useAppDispatch } from '../../app/hooks'

interface BookingDataInterface {
    data: BookingInterface[]
}


export const BookingsTable = ({ data }: BookingDataInterface) => {
    const navigator = useNavigate()
    const dispatch = useAppDispatch()

    const handleInfo = (id: string | undefined) => {
        navigator(`/bookings/booking/${id}`)
    }

    const handleDelete = (booking: BookingInterface, e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation()

        Swal.fire({
            title: "This will delete the booking",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeBookingThunk(booking))
                Swal.fire("Done!", "The booking has been deleted.", "success");
            }
        })
    }

    const handleEdit = (id: string | undefined, e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation()
        navigator(`/bookings/editbooking/${id}`)
    }


    return (
        <>
            {data.map((json) => (

                <RowContainer key={json._id} onClick={() => handleInfo(json._id)}>
                    <TdContainer>
                        <h2>{json.first_name} {json.last_name}</h2>
                        <p>#{json._id}</p>
                    </TdContainer>
                    <TdContainer>

                        <p>{json.order_date}</p>
                    </TdContainer>
                    <TdContainer>
                        <p>{json.check_in}</p>
                    </TdContainer>
                    <TdContainer>
                        <p>{json.check_out}</p>
                    </TdContainer>
                    <SubjectContainer>
                        <TdText>{json.notes}</TdText>
                    </SubjectContainer>
                    <TdContainer>
                        <p>{json.room.room_type}</p>
                    </TdContainer>
                    <TdContainer>
                        {json.status === 'Check-in' && <CheckinStyled>{json.status}</CheckinStyled>}
                        {json.status === 'Check-out' && <CheckoutStyled>{json.status}</CheckoutStyled>}
                        {json.status === 'In progress' && <ProgressStyled>{json.status}</ProgressStyled>}
                        {json.status === 'Cancelled' && <CancelStyled>{json.status}</CancelStyled>}

                    </TdContainer>
                    <TdContainer>
                        <EditIcon onClick={(e) => handleEdit(json._id, e)} />
                        <DeleteIcon onClick={(e) => handleDelete(json, e)} />
                    </TdContainer>
                </RowContainer>

            ))}
        </>
    )
}





