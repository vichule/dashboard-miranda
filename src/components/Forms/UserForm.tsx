import { BasicBtnStyled, GreenBtnStyled } from "../Button/BtnStyled"
import { BtnContainerForm, FormContainer, FormStyled, InputContainer, InputForms, LabelForms, SelectForms, TextAreaForms } from "./FormStyled"
import { UserInterface } from "../../features/interfaces/interfaces"
import React from "react"

interface UserFormProps {
    user: UserInterface,
    change: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    save: React.FormEventHandler<HTMLFormElement>,
    remove: React.MouseEventHandler<HTMLButtonElement>,
}

export const UserForm = ({ user, change, save, remove }: UserFormProps) => {



    return (
        <>
            <FormContainer>
                <FormStyled onSubmit={save}>
                    <InputContainer>
                        <LabelForms htmlFor="first_name">First Name</LabelForms>
                        <InputForms type="text" name="first_name" id='first_name' value={user.first_name} onChange={change} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="last_name">Last Name</LabelForms>
                        <InputForms type="text" name="last_name" id="last_name" value={user.last_name} onChange={change} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="job">Job</LabelForms>
                        <SelectForms name="job" id="job" onChange={change}>
                            <option value="true">Room Service</option>
                            <option value="false">Manager</option>
                            <option value="false">Recepcionist</option>
                        </SelectForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="email">Email</LabelForms>
                        <InputForms type="email" name="email" id="email" value={user.email} onChange={change} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="phone">Phone</LabelForms>
                        <InputForms type="tel" name="phone" id="phone" value={user.phone} onChange={change} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="start_date">Start Date</LabelForms>
                        <InputForms type="date" name="start_date" id="start_date" value={user.start_date} onChange={change} />
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="description">Description</LabelForms>
                        <TextAreaForms name="description" id="description" cols={30} rows={5} value={user.description} onChange={change}></TextAreaForms>
                    </InputContainer>
                    <InputContainer>
                        <LabelForms htmlFor="status">Status</LabelForms>
                        <SelectForms name="status" id="status" value={user.status} onChange={change}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </SelectForms>
                    <InputContainer>
                        <LabelForms htmlFor="password">Password</LabelForms>
                        <InputForms type="password" name="password" onChange={change}/>
                    </InputContainer>
                    </InputContainer>
                    <BtnContainerForm>
                        <GreenBtnStyled type="submit">Save Changes</GreenBtnStyled>
                        <BasicBtnStyled onClick={remove}>Delete User</BasicBtnStyled>
                    </BtnContainerForm>
                </FormStyled>
            </FormContainer>
        </>
    )
}

