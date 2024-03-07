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