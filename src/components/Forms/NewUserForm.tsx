import { useNavigate } from "react-router-dom"
import { getUsersData, getUsersError, getUsersStatus } from "../../features/users/usersSlice"
import { useEffect, useState } from "react"
import { addUserThunk, userListThunk } from "../../features/users/usersThunk"
import { BtnContainerForm, FormContainer, FormStyled, InputContainer, InputForms, LabelForms, SelectForms, TextAreaForms } from "./FormStyled"
import { BasicBtnStyled, GreenBtnStyled } from "../Button/BtnStyled"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

interface NewUserProp extends EventTarget{
            first_name: HTMLFormElement,
            last_name: HTMLFormElement
            email: HTMLFormElement
            start_date: HTMLFormElement
            description: HTMLFormElement
            phone: HTMLFormElement
            status: HTMLFormElement
            password: HTMLFormElement
            job: HTMLFormElement
}

export const NewUserForm = () =>{
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const usersData = useAppSelector(getUsersData)
    const usersDataError = useAppSelector(getUsersError)
    const usersDataStatus = useAppSelector(getUsersStatus)
    const [ userId, setUserId ] = useState<number>(0)

    useEffect(()=>{
        if (usersDataStatus === 'idle'){
            dispatch(userListThunk())
        } else if (usersDataStatus === 'pending'){

        } else if (usersDataStatus === 'fulfilled'){
            //setUserId(usersData.length + 1)
        } else if (usersDataStatus === 'rejected'){
            console.log(usersDataError)
        }
    },[usersData,usersDataStatus,dispatch])

    const handleBack = () =>{
        navigator('/users')
    }

    const handleCreate = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const formUser = event.target as NewUserProp
        const newUser ={
            
            //id: userId,
            first_name: formUser.first_name.value,
            last_name: formUser.last_name.value,
            email: formUser.email.value,
            start_date: formUser.start_date.value,
            description: formUser.description.value,
            phone: formUser.phone.value,
            photo:"http://dummyimage.com/105x100.png/dddddd/000000",
            status: formUser.status.value,
            password: formUser.password.value,
            job: formUser.job.value
        }
        dispatch(addUserThunk(newUser))
        navigator('/users')
    }

    return(
        <>
            <FormContainer>
                <FormStyled onSubmit={handleCreate}>
                    <InputContainer>
                        <LabelForms htmlFor="first_name">First Name</LabelForms>
                        <InputForms type="text" name="first_name" required={true}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="last_name">Last Name</LabelForms>
                        <InputForms type="text" name="last_name" required={true}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="job">Job</LabelForms>
                        <SelectForms name="job" id="job" required={true}>
                            <option value="Room Service">Room Service</option>
                            <option value="Manager">Manager</option>
                            <option value="Recepcionist">Recepcionist</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="email">Email</LabelForms>
                        <InputForms type="email" name="email" required={true}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="phone">Phone</LabelForms>
                        <InputForms type="tel" name="phone" required={true}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="start_date">Start Date</LabelForms>
                        <InputForms type="date" name="start_date" required={true}/>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="description">Description</LabelForms>
                        <TextAreaForms name="description" id="description" cols={30} rows={10} required={true}></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="status">Status</LabelForms>
                        <SelectForms name="status" id="status" required={true} >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="password">Password</LabelForms>
                        <InputForms type="password" name="password" style={{width: '750px'}} required={true}/>
                    </InputContainer><InputContainer>
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