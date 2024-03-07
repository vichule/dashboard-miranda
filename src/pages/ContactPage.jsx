import styled from "styled-components"
import { SwiperReview } from "../components/Swipers/SwiperReview"




export const Contact = () => {




    return (
        <>
            <TopContainer>
                <h1>Contact</h1>
                <SwiperReview/>
            </TopContainer>
        </>
    )
}


export const TopContainer = styled.div`
    max-height: 30rem;
    width: 100%;
    max-width: 140rem;  
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`