import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser, getUsersData, getUsersError, getUsersStatus } from "../../features/users/usersSlice"
import { useEffect, useState } from "react"
import { userListThunk } from "../../features/users/usersThunk"
import { BtnContainerForm, FormContainer, FormStyled, InputContainer, InputForms, LabelForms, SelectForms, TextAreaForms } from "./FormStyled"
import { BasicBtnStyled, GreenBtnStyled } from "../Button/BtnStyled"



export const NewUserForm = () =>{
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const usersData = useSelector(getUsersData)
    const usersDataError = useSelector(getUsersError)
    const usersDataStatus = useSelector(getUsersStatus)
    const [ userId, setUserId ] = useState(0)

    useEffect(()=>{
        if (usersDataStatus === 'idle'){
            dispatch(userListThunk())
        } else if (usersDataStatus === 'pending'){

        } else if (usersDataStatus === 'fulfilled'){
            setUserId(usersData.length + 1)
        } else if (usersDataStatus === 'rejected'){
            console.log(usersDataError)
        }
    },[usersData,usersDataStatus,dispatch])

    const handleBack = () =>{
        navigator('/users')
    }

    const handleCreate = (event)=>{
        event.preventDefault()
        const newUser ={
            
            id: userId,
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            email: event.target.email.value,
            start_date: event.target.start_date.value,
            description: event.target.description.value,
            phone: event.target.phone.value,
            photo:"http://dummyimage.com/105x100.png/dddddd/000000",
            status: event.target.status.value 
        }
        dispatch(addUser(newUser))
        navigator('/users')
    }

    return(
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
                        <LabelForms htmlFor="job">Job</LabelForms>
                        <SelectForms name="job" id="job">
                            <option value="true">Room Service</option>
                            <option value="false">Manager</option>
                            <option value="false">Recepcionist</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="email">Email</LabelForms>
                        <InputForms type="email" name="email"/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="phone">Phone</LabelForms>
                        <InputForms type="tel" name="phone" />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="start_date">Start Date</LabelForms>
                        <InputForms type="date" name="start_date"/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="description">Description</LabelForms>
                        <TextAreaForms name="description" id="description" cols="30" rows="10"></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="status">Status</LabelForms>
                        <SelectForms name="status" id="status" >
                            <option value="Status">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </SelectForms>
                    </InputContainer>
                    <BtnContainerForm>
                        <GreenBtnStyled type="submit">Create User</GreenBtnStyled>
                        <BasicBtnStyled onClick={handleBack}>Cancel</BasicBtnStyled>
                    </BtnContainerForm>
                </FormStyled>
            </FormContainer>
            
        </>
    )
}