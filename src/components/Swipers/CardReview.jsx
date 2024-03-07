import React from "react"
import data from '../../data/comments.json'
import styled from "styled-components"
import { colors } from "../../styles/colors"

export const CardReview = () => {


    return(
        <ReviewContainer>
        {data.map(({ message, photo, first_name, last_name, id}) =>
        <CardContainer key={id}>
            <TextContainer>  
                {message}
            </TextContainer>
            <UserContainer>
                <ImgUser src={photo} alt="" />
                <TextUser>{first_name} {last_name}</TextUser>
            </UserContainer>
        </CardContainer>
        )}
        </ReviewContainer>
    )
}
const ReviewContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: left;
`

const CardContainer = styled.div`
    width: 30em;
    margin-right: 2em;
`

const TextContainer = styled.div`
    color: ${colors.hardGrey};
    font-size:1.5rem;
    line-height: 2.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    font-weight: 400;   
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2em;
    margin-top: 2em;
`

const ImgUser = styled.img`
    width: 5rem;
    height: 5rem;
    border-radius: 1em;
`

const TextUser = styled.p`
    color:${colors.black};
    font-size: 1.5rem;
    font-weight:600;
    line-height: 2rem;
`