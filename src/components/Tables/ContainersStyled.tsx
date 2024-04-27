import styled from "styled-components"
import { colors } from "../../styles/colors"


const TableStatusStyle =`
    padding: 2em;
    border-radius: 1em;
    color: ${colors.white};
    font-size: 1rem;
    font-weight: 600;
    width: 100px;
    text-align: center;
`
export const CheckinStyled = styled.p`
    ${TableStatusStyle}
    background-color: ${colors.green};
    
`

export const CheckoutStyled = styled.p`
    background-color: ${colors.red};
    ${TableStatusStyle}
`

export const ProgressStyled = styled.p`
    background-color: ${colors.orange};
    ${TableStatusStyle}
`

export const CancelStyled = styled.p`
    background-color: ${colors.grey};
    ${TableStatusStyle}
`

export const RowContainer = styled.tr`
    
    border-radius: 1em;
    transition: all ease 300ms;

    &:hover{
        scale: 1.02;
        box-shadow: 0px 1px 3px black;
        cursor: pointer;
        
    }
`

export const TdContainer = styled.td`
    padding: 1em;
    width: 34em;
    text-align: center;
`

export const SubjectContainer = styled.td`
    padding: 2em;
    width: 200em;
    text-align: center;
`