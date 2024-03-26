import styled from "styled-components";

interface BtnProp {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    isActive: boolean,
    children: React.ReactElement
}

export const ThemeButtonStyled = styled.button<{$isActive?:boolean}>`
    color: ${props => props.$isActive ? 'rgb(0, 0, 0)' : 'rgb(251, 159, 68)'};
`
export default function Btn({onClick, isActive, children}: BtnProp) {

    return( <ThemeButtonStyled onClick={onClick} $isActive={isActive}>
                {children}
            </ThemeButtonStyled>
    )
}