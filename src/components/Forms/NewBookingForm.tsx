import { useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { BtnContainerForm, FormContainer, FormStyled, InputContainer, InputForms, LabelForms, SelectForms, TextAreaForms } from "./FormStyled"
import { BasicBtnStyled, GreenBtnStyled } from "../Button/BtnStyled"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getBookingsData, getBookingsError, getBookingsStatus } from "../../features/bookings/bookingsSlice"
import { addBookingThunk, bookingsListThunk } from "../../features/bookings/bookingsThunk"
import { getRoomsData } from "../../features/rooms/roomsSlice"
import { roomListThunk } from "../../features/rooms/roomsThunk"

interface NewBookingProp extends EventTarget {
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

export const NewBookingForm = () => {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const bookingsData = useAppSelector(getBookingsData)
    const bookingsDataError = useAppSelector(getBookingsError)
    const bookingsDataStatus = useAppSelector(getBookingsStatus)
    const [bookingId, setBookingId] = useState<number>(0)
    const roomsData = useAppSelector(getRoomsData)

    const availableRooms = useMemo(() => {
        return [...roomsData].filter((room) => room.status === 'Available');
    }, [roomsData])

    const initFetch = () => {
        dispatch(bookingsListThunk())
        dispatch(roomListThunk())
    }

    useEffect(() => {
        initFetch()
        
    }, [])

    useEffect(() => {
        if (bookingsDataStatus === 'idle') {
            dispatch(bookingsListThunk())
        } else if (bookingsDataStatus === 'pending') {

        } else if (bookingsDataStatus === 'fulfilled') {
            //setBookingId(bookingsData.length + 1)
        } else if (bookingsDataStatus === 'rejected') {
            console.log(bookingsDataError)
        }
    }, [bookingsData, bookingsDataStatus, dispatch])

    const handleBack = () => {
        navigator('/bookings')
    }

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formBooking = event.target as NewBookingProp
        const roomSelected = formBooking.room.value
        const newBooking = {

            first_name: formBooking.first_name.value,
            last_name: formBooking.last_name.value,
            order_date: formBooking.order_date.value,
            check_in: formBooking.check_in.value,
            check_out: formBooking.check_out.value,
            notes: formBooking.notes.value,
            room: roomSelected,
            status: "In progress",
            discount: formBooking.discount.value,
            room_type: roomSelected.room_type,
        }
        dispatch(addBookingThunk(newBooking))
        navigator('/bookings')
    }

    return (
        <>
            <FormContainer>
                <FormStyled onSubmit={handleCreate}>

                    <InputContainer>
                        <LabelForms htmlFor="first_name">First Name</LabelForms>
                        <InputForms type="text" name="first_name" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="last_name">Last Name</LabelForms>
                        <InputForms type="text" name="last_name" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="discount">Discount</LabelForms>
                        <InputForms type="number" name="discount" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="order_date">Order Date</LabelForms>
                        <InputForms type="date" name="order_date" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="check_in">Check In Date</LabelForms>
                        <InputForms type="date" name="check_in" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="check_out">Check Out Date</LabelForms>
                        <InputForms type="date" name="check_out" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="room">Room</LabelForms>
                        <SelectForms name="room" id="room">
                        {availableRooms?.map((room) => (
                            <option value={room._id} key={room._id}>{room.room_number}</option>
                        ))}
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="notes">Notes</LabelForms>
                        <TextAreaForms name="notes" id="notes" cols={30} rows={8}></TextAreaForms>
                    </InputContainer>
                    <BtnContainerForm>
                        <GreenBtnStyled type="submit">Create Booking</GreenBtnStyled>
                        <BasicBtnStyled onClick={handleBack}>Cancel</BasicBtnStyled>
                    </BtnContainerForm>
                </FormStyled>
            </FormContainer>

        </>
    )
}