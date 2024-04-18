import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BtnContainerForm, FormContainer, FormStyled, InputContainer, InputForms, LabelForms, SelectForms, TextAreaForms } from "./FormStyled"
import { BasicBtnStyled, GreenBtnStyled } from "../Button/BtnStyled"
import { addRoomThunk, roomListThunk } from "../../features/rooms/roomsThunk"
import { getRoomsData, getRoomsError, getRoomsStatus } from "../../features/rooms/roomsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

interface NewRoomProp extends EventTarget {
    room_type: HTMLFormElement,
    room_number: HTMLFormElement,
    price: HTMLFormElement,
    description: HTMLFormElement,
    cancellation: HTMLFormElement,
    amenities: HTMLFormElement

}

export const NewRoomForm = () => {
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const roomsData = useAppSelector(getRoomsData)
    const roomsDataError = useAppSelector(getRoomsError)
    const roomsDataStatus = useAppSelector(getRoomsStatus)
    const [roomId, setRoomId] = useState<number>(0)

    useEffect(() => {
        if (roomsDataStatus === 'idle') {
            dispatch(roomListThunk())
        } else if (roomsDataStatus === 'pending') {

        } else if (roomsDataStatus === 'fulfilled') {
            //setRoomId(roomsData.length + 1)
        } else if (roomsDataStatus === 'rejected') {
            console.log(roomsDataError)
        }
    }, [roomsData, roomsDataStatus, dispatch])

    const handleBack = () => {
        navigator('/rooms')
    }

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formRoom = event.target as NewRoomProp
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
            photos: [
                "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHxzaW5nbGUlMjByb29tJTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
                "https://images.unsplash.com/photo-1576354302919-96748cb8299e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNpbmdsZSUyMHJvb20lMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
                "https://images.unsplash.com/photo-1619128395560-8a749ac9926d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNpbmdsZSUyMGJlZCUyMGhvdGVsfGVufDB8fDB8fHww"
            ],
            status: "Available",
            discount: 20,
            amenities: amenitiesArr,
        }
        dispatch(addRoomThunk(newRoom))
        navigator('/rooms')
    }

    return (
        <>
            <FormContainer>
                <FormStyled onSubmit={handleCreate}>
                    <InputContainer>
                        <LabelForms htmlFor="room_number">Room Number</LabelForms>
                        <InputForms type="number" name="room_number" />
                    </InputContainer>

                    <InputContainer>
                        <LabelForms htmlFor="room_type">Room Type</LabelForms>
                        <SelectForms name="room_type" id="room_type">
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="price">Price Per Night</LabelForms>
                        <InputForms type="number" name="price" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="description">Description</LabelForms>
                        <TextAreaForms name="description" id="description" cols={30} rows={8}></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="cancellation">Cancellation</LabelForms>
                        <TextAreaForms name="cancellation" id="cancellation" cols={30} rows={2}></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="amenities">Amenities</LabelForms>
                        <SelectForms multiple name="amenities" id="amenities" required >
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
                    <BtnContainerForm>
                        <GreenBtnStyled type="submit">Create Room</GreenBtnStyled>
                        <BasicBtnStyled onClick={handleBack}>Cancel</BasicBtnStyled>
                    </BtnContainerForm>
                </FormStyled>
            </FormContainer>

        </>
    )
}