import styled from "styled-components";
import { colors } from "../../styles/colors";


export const BasicBtnStyled = styled.button`
    font-weight: 600;
    width: 16rem;
    height: 3.5rem;
    border: none;
    border-radius: 8px;
    background-color: ${colors.whiteSemi};
    color: ${colors.hardGreen};
    transition: all ease 300ms;

    &:hover{
        background-color: ${colors.hardGreen};
        color: ${colors.whiteSemi};
    }
`

export const GreenBtnStyled = styled.button`
    font-weight: 600;
    width: 16rem;
    height: 3.5rem;
    border: none;
    border-radius: 8px;
    background-color: ${colors.hardGreen};
    color: ${colors.whiteSemi};
    transition: all ease 300ms;

    &:hover{
        background-color: ${colors.btnBack2};
        color: ${colors.hardGreen};
    }
`

const btnTableStyled =`
    background-color: transparent;
    font-size: 1.5rem;
`

export const BtnPublish = styled.button`
    ${btnTableStyled}
    color: ${colors.green};
    &:hover{
        border-color: ${colors.green};
    }
`

export const BtnArchive = styled.button`
    ${btnTableStyled}
    color: ${colors.red};
    &:hover{
        border-color: ${colors.red};
    }
`
