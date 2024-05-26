import { Swiper, SwiperSlide} from "swiper/react";
import { Keyboard, Navigation } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { colors } from "../../styles/colors";
import styled from "styled-components";
import { CheckIcon, CrossIcon } from "../../styles/icons";
import { getCommentsListData, getCommentsListError, getCommentsListStatus } from "../../features/contact/contactSlice"
import { commentsListThunk, removeCommentThunk } from "../../features/contact/contactThunk"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ContactInterface } from "../../features/interfaces/interfaces";

interface CommentInterface {
    comment: ContactInterface,
    e: React.MouseEvent<HTMLDivElement>
}

export const SwiperReview = () => {
    const dispatch = useAppDispatch()
    const commentsData = useAppSelector(getCommentsListData)
    const commentsDataError = useAppSelector(getCommentsListError)
    const commentsDataStatus = useAppSelector(getCommentsListStatus)
    const [ comments, setComments] = useState<ContactInterface[]>([])

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

    const differenceDate = (date: string) => {
        return Math.floor(((Date.now() - new Date(date).getTime()) )/(1000*60*60*24))
    }

    const popUp = ({comment}: CommentInterface) =>{
        Swal.fire({
            title: `Message from ${comment.first_name} ${comment.last_name}`,
            text: comment.message,
            confirmButtonText: 'Close',
            confirmButtonColor: colors.hardGreen,
            color: colors.white,
            background: colors.blackSemi,
            width:'1200px',
          })
    }

    const handleDelete = (comment: ContactInterface, event: React.MouseEvent<SVGElement, MouseEvent>) =>{
        event.stopPropagation()
        Swal.fire({
            title: "This will delete the comment",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeCommentThunk(comment))
              Swal.fire("Done!", "The comment has been deleted.", "success");
            }
          })
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
                {comments.map((comment) => (
                <SwiperSlide key={comment._id}>
                    <ReviewContainer>
                        
                        <CardContainer >
                            <TextContainer onClick={ (e) => popUp({comment, e})}>  
                                {comment.message}
                            </TextContainer>
                            <UserContainer>
                                <ImgUser src={comment.photo} alt="" />
                                <div>
                                    <TextUser>{comment.first_name} {comment.last_name}</TextUser>
                                    <DateUser>{differenceDate(comment.date)} days ago</DateUser>
                                </div>
                                <CheckIcon/>
                                <CrossIcon onClick={ (e) => handleDelete(comment, e)}/>
                            </UserContainer>
                        </CardContainer>
                        
                    </ReviewContainer>                
                </SwiperSlide>
                ))}
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
    background-color: ${({theme}) => theme.bgCard};
    min-height: 21rem;

    &:hover{
        scale: 1.02;
        box-shadow: 0px 1px 3px black;
        
    }
`

const CardContainer = styled.div`
    width: 30em;
`

const TextContainer = styled.div`
    color: ${({theme}) => theme.subText};
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
    color:${({theme}) => theme.mainText};
    font-size: 1.5rem;
    font-weight:600;
    line-height: 2rem;
`

const DateUser = styled.p`
    color:${colors.lightGreen};
    font-size: 1rem;
    font-weight:400;
    line-height: 2rem;
`