import styled from "styled-components"
import { colors } from "../../styles/colors"
import { IconType } from "react-icons"



export const KpiCard = ({Icon,number,text}: {Icon: IconType, number: number, text: string}) => {

    return(

        <KpiContainer>
            <IconContainer>
                <Icon/> 
            </IconContainer>
            <TextContainer>
                <h1>{number}</h1>
                <p>{text}</p>
            </TextContainer>
        </KpiContainer>
    )
}

const KpiContainer = styled.div`
    
    
    display: flex;
    align-items: center;
    max-width: 35rem;
    min-width: 25rem;
    padding: 3em;
    border-radius: 1em;
    transition: all ease 300ms;
    background-color: ${({theme}) => theme.bgSecond};
    gap:2em;
    

    &:hover{
        scale:1.05;
        box-shadow: 0px 3px 8px ${colors.black};
        
    }
`

const IconContainer = styled.div`
        background-color: ${colors.lightRed};
        width: 6.5rem;
        height: 6.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1em;
        cursor: pointer;
    &:hover{
        background-color: ${colors.red};
        
        & > * {
                color: ${colors.white};
            }
    }
`

const TextContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;

    h1{
        font-size: 3rem;
        line-height: 4.6rem;
        font-weight: 600;
        color: ${({theme}) => theme.mainText};
        display: flex;
    }
    p{
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: 300;
        color: ${colors.grey2};
    }
`