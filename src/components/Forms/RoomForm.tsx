import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { BtnContainerForm, FormContainer, FormStyled, InputContainer, InputForms, LabelForms, SelectForms, TextAreaForms } from "./FormStyled"
import { BasicBtnStyled, GreenBtnStyled } from "../Button/BtnStyled"
import { addRoomThunk, editRoomThunk, roomListThunk, roomThunk } from "../../features/rooms/roomsThunk"
import { getRoomData, getRoomStatus, getRoomsData, getRoomsError, getRoomsStatus } from "../../features/rooms/roomsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RoomInterface } from "../../features/interfaces/interfaces"

interface RoomProp extends EventTarget {
    room_type: HTMLFormElement,
    room_number: HTMLFormElement,
    price: HTMLFormElement,
    description: HTMLFormElement,
    cancellation: HTMLFormElement,
    amenities: HTMLFormElement,
    discount: HTMLFormElement,
    status: HTMLFormElement

}

export const RoomForm = () => {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const { id } = useParams()
    const [spinner, setSpinner] = useState(true)
    const roomData = useAppSelector(getRoomData)
    const roomDataStatus = useAppSelector(getRoomStatus)

    const handleBack = () => {
        navigator('/rooms')
    }

    

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
    };

    const [room, setRoom] = useState<RoomInterface>({

        _id: '',
        room_type: "",
        room_number: 0,
        description: "",
        price: 0,
        discount: 0,
        offer: true,
        cancellation: "",
        status: "",
        photos: [],
        amenities: []
    })

    useEffect(() => {
        if (roomDataStatus === "idle") {
            dispatch(roomThunk(id || ''));
        } else if (roomDataStatus === "pending") {
            console.log(roomDataStatus)
        } else if (roomDataStatus === "fulfilled") {
            const specificRoom = roomData as RoomInterface
            setRoom({ ...specificRoom })
            setSpinner(false)

        }
    }, [dispatch, roomDataStatus, roomData])

    const handleEditRoom = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formRoom = event.target as RoomProp
        const amenitiesOptions = formRoom.amenities.selectedOptions;
        const amenitiesArr: string[] = [];
        for (let i = 0; i < amenitiesOptions.length; i++) {
            amenitiesArr.push(amenitiesOptions[i].value)
        }
        const newRoom = {

            // _id: roomId.toString(),
            room_type: formRoom.room_type.value,
            room_number: formRoom.room_number.value,
            price: formRoom.price.value,
            offer: true,
            description: formRoom.description.value,
            cancellation: formRoom.cancellation.value,
            photos: room.photos,
            status: formRoom.status.value,
            discount: formRoom.discount.value,
            amenities: amenitiesArr.length > 0 ? amenitiesArr : room.amenities,
        }
       
        dispatch(editRoomThunk({...room, ...newRoom}))
        navigator('/rooms')
    }

    return (
        <>
            <FormContainer>
                <FormStyled onSubmit={handleEditRoom}>
                    <InputContainer>
                        <LabelForms htmlFor="room_number">Room Number</LabelForms>
                        <InputForms type="number" name="room_number" value={room.room_number} onChange={handleChange} />
                    </InputContainer>

                    <InputContainer>
                        <LabelForms htmlFor="room_type">Room Type</LabelForms>
                        <SelectForms name="room_type" id="room_type" value={room.room_type} onChange={handleChange}>
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="price">Price Per Night</LabelForms>
                        <InputForms type="number" name="price" value={room.price} onChange={handleChange} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="discount">Discount</LabelForms>
                        <InputForms type="number" name="discount" value={room.discount} onChange={handleChange} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="description">Description</LabelForms>
                        <TextAreaForms name="description" id="description" cols={30} rows={8} value={room.description} onChange={handleChange}></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="cancellation">Cancellation</LabelForms>
                        <TextAreaForms name="cancellation" id="cancellation" cols={30} rows={2} value={room.cancellation} onChange={handleChange}></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="amenities">Amenities</LabelForms>
                        <SelectForms multiple name="amenities" id="amenities" onChange={handleChange}>
                            <option value="Air conditioner">Air Conditioner</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Shop near">Shop near</option>
                            <option value="24/7 Online Suppor">24/7 Online Suppor</option>
                            <option value="Smart Security">Smart Security</option>
                            <option value="High-speed Wifi">High-speed Wifi</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Shower">Shower</option>
                            <option value="Towels">Towels</option>
                            <option value="Strong Locker">Strong Locker</option>
                            <option value="Expert Team">Expert Team</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="status">Status</LabelForms>
                        <SelectForms name="status" id="status" value={room.status} onChange={handleChange}>
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                        </SelectForms>
                    </InputContainer>
                    <BtnContainerForm>
                        <GreenBtnStyled type="submit">Edit Room</GreenBtnStyled>
                        <BasicBtnStyled onClick={handleBack}>Cancel</BasicBtnStyled>
                    </BtnContainerForm>
                </FormStyled>
            </FormContainer>

        </>
    )
}