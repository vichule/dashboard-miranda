import { Swiper, SwiperSlide} from "swiper/react";
import { Keyboard, Navigation } from 'swiper/modules';

import data from '../../data/comments.json'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { colors } from "../../styles/colors";
import styled from "styled-components";
import { CheckIcon, CrossIcon } from "../../styles/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsListData, getCommentsListError, getCommentsListStatus } from "../../features/contact/contactSlice"
import { commentsListThunk } from "../../features/contact/contactThunk"
import { useEffect, useState } from "react";

export const SwiperReview = () => {
    const dispatch = useDispatch()
    const commentsData = useSelector(getCommentsListData)
    const commentsDataError = useSelector(getCommentsListError)
    const commentsDataStatus = useSelector(getCommentsListStatus)
    const [ comments, setComments] = useState([])

    useEffect(() =>{
        let newComments = []
        if(commentsDataStatus === 'idle'){
            dispatch(commentsListThunk())
        }
        if (commentsDataStatus === 'pending'){
            
        }else if(commentsDataStatus === 'fulfilled'){
            newComments = [...commentsData]
            setComments(newComments)

        }else if(commentsDataStatus === 'rejected'){
            console.log(commentsDataError)
        }
    },[dispatch, commentsData, commentsDataStatus])

    const differenceDate = (date) => {
        return Math.floor(((Date.now() - new Date(date).getTime()) )/(1000*60*60*24))
    }


    return(
        <>
            <StyledSwiper
                modules={[ Navigation, Keyboard]}
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                keyboard={{
                    enabled: true,
                }}

            >
                {comments.map(({ message, photo, first_name, last_name, id, date}) =>
                <SwiperSlide key={id}>
                    <ReviewContainer>
                        
                        <CardContainer >
                            <TextContainer>  
                                {message}
                            </TextContainer>
                            <UserContainer>
                                <ImgUser src={photo} alt="" />
                                <div>
                                    <TextUser>{first_name} {last_name}</TextUser>
                                    <DateUser>{differenceDate(date)} days ago</DateUser>
                                </div>
                                <CheckIcon/>
                                <CrossIcon/>
                            </UserContainer>
                        </CardContainer>
                        
                    </ReviewContainer>                
                </SwiperSlide>
            )}
            </StyledSwiper>


            
        </>
        
    )
}


const StyledSwiper = styled(Swiper)`
    width: 100%;
    margin: 0 auto;
    padding: 2em;
    padding-right: 5.5em;

    & .swiper-button-prev, .swiper-button-next {
        color: ${colors.white};
        background: ${colors.hardGreen};
        width: 3em;
        height: 3em;
        border-radius: 0.3em;
        &::after {
            font-size: 1rem;
        }
        & .swiper-button-disabled {
            display: none;
        }
        
    }

`

const ReviewContainer = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: left;
    border: 1px solid #8080804f;
    padding: 2em 1em 2em 1em;
    margin: 0em 3em;
    border-radius: 3em;
    transition: all ease 300ms;
    background-color: ${colors.white};

    &:hover{
        scale: 1.02;
        box-shadow: 0px 1px 3px black;
        
    }
`

const CardContainer = styled.div`
    width: 30em;
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
    cursor: pointer;
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2em;
    margin-top: 2em;
`

const ImgUser = styled.img`
    width: 7rem;
    height: 7rem;
    border-radius: 1em;
`

const TextUser = styled.p`
    color:${colors.black};
    font-size: 1.5rem;
    font-weight:600;
    line-height: 2rem;
`

const DateUser = styled.p`
    color:${colors.lightGrey};
    font-size: 1rem;
    font-weight:400;
    line-height: 2rem;
`