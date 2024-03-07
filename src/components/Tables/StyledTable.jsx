import styled from "styled-components";
import { colors } from "../../styles/colors";



export const TableStyled = styled.table`
    width: 95%;
    border-radius: 1em;
    text-align: left;
    padding: 0em 5em 0em 5em;
    border-spacing: 1rem 2em;
    height: 50rem;
    background-color: ${colors.white};
    margin-bottom: 2em;
`

export const TdStyled = styled.th `
    font-size: 1.2rem;
    font-weight: 600;
    padding: 1em 0em;
    border-bottom: 2px solid ${colors.whiteSemi};
    
`

export const TdText = styled.p`
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.7rem;
    max-width: 60em;
`