import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { BtnContainerForm, FormContainer, FormStyled, InputContainer, InputForms, LabelForms, SelectForms, TextAreaForms } from "./FormStyled"
import { BasicBtnStyled, GreenBtnStyled } from "../Button/BtnStyled"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getBookingData, getBookingError, getBookingStatus } from "../../features/bookings/bookingsSlice"
import { addBookingThunk, bookingThunk, editBookingThunk } from "../../features/bookings/bookingsThunk"
import { BookingInterface, RoomInterface } from "../../features/interfaces/interfaces"

interface BookingProp extends EventTarget {
    first_name: HTMLFormElement,
    last_name: HTMLFormElement
    order_date: HTMLFormElement
    check_in: HTMLFormElement
    check_out: HTMLFormElement
    notes: HTMLFormElement
    room: HTMLFormElement
    status: HTMLFormElement
    room_type: HTMLFormElement
    discount: HTMLFormElement

}

export const BookingForm = () => {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const { id } = useParams()
    const [spinner, setSpinner] = useState(true)
    const bookingData = useAppSelector(getBookingData)
    const bookingStatus = useAppSelector(getBookingStatus)
    const bookingError = useAppSelector(getBookingError)

    const [booking, setBooking] = useState<BookingInterface>({

        _id: '',
        first_name: "",
        last_name: "",
        order_date: "",
        check_in: "",
        check_out: "",
        notes: "",
        room: {} as RoomInterface,
        status: "",
        discount: 0,
        room_type: ""
    })

    const bookingRoom = booking.room

    useEffect(() => {
        if (bookingStatus === 'idle') {
            dispatch(bookingThunk(id || ''))
        } else if (bookingStatus === 'pending') {

        } else if (bookingStatus === 'fulfilled') {
            const sepecificBooking = bookingData as BookingInterface
            setBooking({ ...sepecificBooking })

            setSpinner(false)
        } else if (bookingStatus === 'rejected') {
            console.log(bookingError)
        }
    }, [bookingData, bookingStatus, dispatch])

    const handleBack = () => {
        navigator('/bookings')
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
    };

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formBooking = event.target as BookingProp
        const newBooking = {

            //id: bookingId,
            first_name: formBooking.first_name.value,
            last_name: formBooking.last_name.value,
            order_date: formBooking.order_date.value,
            check_in: formBooking.check_in.value,
            check_out: formBooking.check_out.value,
            notes: formBooking.notes.value,
            room: bookingRoom,
            status: formBooking.status.value,
            discount: formBooking.discount.value,
            room_type: formBooking.room_type.value,
        }
        dispatch(editBookingThunk({...booking,...newBooking}))
        navigator('/bookings')
    }

    return (
        <>
            <FormContainer>
                <FormStyled onSubmit={handleEdit}>
                    
                    <InputContainer>
                        <LabelForms htmlFor="first_name">First Name</LabelForms>
                        <InputForms type="text" name="first_name" value={booking.first_name} onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="last_name">Last Name</LabelForms>
                        <InputForms type="text" name="last_name" value={booking.last_name} onChange={handleChange}/>
                    </InputContainer>
                    
                    <InputContainer>
                        <LabelForms htmlFor="order_date">Order Date</LabelForms>
                        <InputForms type="date" name="order_date" value={booking.order_date} onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="check_in">Check In Date</LabelForms>
                        <InputForms type="date" name="check_in" value={booking.check_in} onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="check_out">Check Out Date</LabelForms>
                        <InputForms type="date" name="check_out" value={booking.check_out} onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="room">Room</LabelForms>
                        <InputForms type="string" name="room" value={bookingRoom._id}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="discount">Discount</LabelForms>
                        <InputForms type="number" name="discount" value={booking.discount} onChange={handleChange} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="room_type">Room Type</LabelForms>
                        <SelectForms name="room_type" id="room_type" value={booking.room_type} onChange={handleChange}>
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="notes">Notes</LabelForms>
                        <TextAreaForms name="notes" id="notes" cols={30} rows={8} value={booking.notes} onChange={handleChange}></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="status">Status</LabelForms>
                        <SelectForms name="status" id="status" value={booking.status} onChange={handleChange}>
                            <option value="Check-in">Check-in</option>
                            <option value="Check-out">Check-out</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Cancelled">Cancelled</option>
                        </SelectForms>
                    </InputContainer>
                    <BtnContainerForm>
                        <GreenBtnStyled type="submit">Edit Booking</GreenBtnStyled>
                        <BasicBtnStyled onClick={handleBack}>Cancel</BasicBtnStyled>
                    </BtnContainerForm>
                </FormStyled>
            </FormContainer>

        </>
    )
}