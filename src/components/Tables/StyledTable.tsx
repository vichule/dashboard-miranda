import styled from "styled-components";



export const TableStyled = styled.table`
    width: 95%;
    border-radius: 1em;
    text-align: left;
    padding: 0em 5em 0em 5em;
    border-spacing: 1rem 2em;
    background-color: ${({ theme }) => theme.bgSecond};
    margin-bottom: 2em;
`

export const TdStyled = styled.th `
    font-size: 1.2rem;
    font-weight: 600;
    padding: 1em 0em;
    border-bottom: 2px solid ${({ theme }) => theme.borderColor};
    text-align: center;
    height: 15rem;
    
`

export const TdText = styled.p`
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.7rem;
    max-width: 60em;
`