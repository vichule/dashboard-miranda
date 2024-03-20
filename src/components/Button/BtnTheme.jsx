import styled from "styled-components";

export const ThemeButtonStyled = styled.button`
    color: ${props => props.$isActive ? 'rgb(251, 159, 68)' : 'rgb(0, 0, 0)'};
`
export default function Btn({onClick, isActive, children}) {

    return( <ThemeButtonStyled onClick={onClick} $isActive={isActive}>
                {children}
            </ThemeButtonStyled>
    )
}