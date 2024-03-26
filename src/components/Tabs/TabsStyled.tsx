import styled from "styled-components"
import { colors } from "../../styles/colors"

export const TabMenu = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: flex-start;
    width: 85%;
    align-items: flex-end;
`
export const TabElement = styled.li<{$isActive?:boolean}>`
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    border-bottom: ${props => props.$isActive ? '2px solid rgb(19, 88, 70)' : '1px solid rgb(120, 120, 120)'};
    color: ${props => props.$isActive ? 'rgb(19, 88, 70)' : 'rgb(120, 120, 120)'};
    width: 11em;
        /* &:hover{
            color: ${colors.hardGreen};
            border-bottom: 2px solid ${colors.hardGreen};
        } */
    `

interface TabsProp{
    onClick: React.MouseEventHandler<HTMLLIElement>,
    isActive: boolean,
    children: React.ReactElement
}

export default function TabLi({onClick, isActive, children}: TabsProp){
    return(
        <TabElement onClick={onClick} $isActive={isActive}>
            {children}
        </TabElement>
    )
}