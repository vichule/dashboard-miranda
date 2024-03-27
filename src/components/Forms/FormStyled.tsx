import styled from "styled-components"
import { colors } from "../../styles/colors"

export const FormContainer = styled.div`
    display: grid;
    justify-content: center;
    justify-items: center;
    padding: 5em;
`

export const InputContainer = styled.div`
    display: grid;
    margin-bottom: 2em;
`

export const BtnContainerForm = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 170px);
    gap: 20em;
`

export const FormStyled = styled.form`
    background-color: ${colors.white};
    width: 600px;
    border-radius: 2em;
    padding: 3em;
`

export const LabelForms = styled.label`
    color: ${colors.hardGreen};
    font-size: 1.8rem;
`

export const InputForms = styled.input`
    border-radius: 1em;
    padding: 1em;
    background-color: #d6fdd69c;
    border: none;
    color: ${colors.hardGreen};
    font-size: 1.3rem;
`

export const TextAreaForms = styled.textarea`
border-radius: 1em;
    padding: 1em;
    background-color: #d6fdd69c;
    border: none;
    color: ${colors.hardGreen};
    font-size: 1.3rem;
`

export const SelectForms = styled.select`
    border-radius: 1em;
    padding: 1em;
    background-color: #d6fdd69c;
    border: none;
    color: ${colors.hardGreen};
    font-size: 1.3rem;

    option{
        background-color: #d6fdd69c;
        border: none;
        color: ${colors.hardGreen};
        font-size: 1.3rem;
    }
`