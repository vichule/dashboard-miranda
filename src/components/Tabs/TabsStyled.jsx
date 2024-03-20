import styled from "styled-components"
import { colors } from "../../styles/colors"

export const TabMenu = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    width: 85%;
    align-items: flex-end;
`
export const TabElement = styled.li`
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    border-bottom: ${props => props.$isActive ? `2px solid ${colors.hardGreen}` : `1px solid ${colors.grey2}`};
    color: ${props => props.$isActive ? `${colors.hardGreen}` : `${colors.grey2}`};
    width: 11em;
        &:hover{
            color: ${colors.hardGreen};
            border-bottom: 2px solid ${colors.hardGreen};
        }
        /* &:active{
            color: ${colors.hardGreen};
            border-bottom: 2px solid ${colors.hardGreen};
        } */
    `