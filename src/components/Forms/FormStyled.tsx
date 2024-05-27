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
    display: flex;
    justify-content: space-around;
    width: 750px;
`

export const FormStyled = styled.form`
    background-color: ${({ theme }) => theme.bgSecond};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 360px));
    grid-template-rows: 1fr 0fr;
    gap: 2em;
    width: 800px;
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
    max-height: 8rem;
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