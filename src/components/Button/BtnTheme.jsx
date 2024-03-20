import styled from "styled-components";

export const ThemeButtonStyled = styled.button`
    color: ${props => props.$isActive ? 'rgb(0, 0, 0)' : 'rgb(251, 159, 68)'};
`
export default function Btn({onClick, isActive, children}) {

    return( <ThemeButtonStyled onClick={onClick} $isActive={isActive}>
                {children}
            </ThemeButtonStyled>
    )
}