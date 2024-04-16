import styled from "styled-components"
import { colors } from "../../styles/colors"
import { RoomInterface } from "../../features/interfaces/interfaces"

interface RoomProp{
    room: RoomInterface
}


export const RoomCard = ({room}: RoomProp) => {

    const amenities = room.amenities
    const photos = room.photos

    return(
        <>
            <CardContainer>
                <TextContainer>
                    <CardHeader>Room Information</CardHeader>
                    <CardSubTitle>Room ID:</CardSubTitle>
                    <CardId>ID #{room._id}</CardId>
                    <CardGrid>
                        <CardFlexContainer>
                            <CardSubTitle>Room Type:</CardSubTitle>
                            <CardPar>{room.room_type}/{room.room_number}</CardPar>
                        </CardFlexContainer>
                        <CardFlexContainer>
                            <CardSubTitle>Price</CardSubTitle>
                            <CardPar>{room.price} /Night</CardPar>
                        </CardFlexContainer>
                            
                        
                    </CardGrid>
                    <CardGap></CardGap>
                        
                        <CardSubTitle>Facilities</CardSubTitle>
                        <CardGrid> 
                            {amenities.map((element, index) => (
                                            <CardAmenities key={index}>{element}</CardAmenities>
                                        ))}
                        </CardGrid>
                </TextContainer>
                
                <CardPicContainer>
                    <img src={photos[0]} alt="" />
                    <CardFlexContainer>
                            <CardSubTitle>Description of the Room</CardSubTitle>
                            <CardPar>{room.description}</CardPar>
                        </CardFlexContainer>
                </CardPicContainer>
            </CardContainer>
        </>
    )
}




const CardContainer = styled.div`
background-color: ${colors.white};
width: 80%;
height: 100%;
display: flex;
border-radius: 1em;
margin: 2em;
border: 3px solid ${colors.hardGreen};
`

const TextContainer =  styled.div`
width: 50%;
background-color: transparent;
display: flex;
flex-direction: column;
gap: 2em;
padding: 2em;
text-align: left;
`
const CardGrid = styled.div`
display: grid;
grid-template-columns: repeat( auto-fit, minmax(50px, 250px));
grid-template-rows: 1fr 0fr;
gap: 2em;
`

const CardPar = styled.p`
font-size: 1.5rem;
color: ${colors.blackSemi};
`
const CardPicContainer =  styled.div`
width: 50%;
padding: 1em;
background-color: transparent;
    img{
        height: 80%;
        width: 100%;
        border-radius: 1em;
    }
`

const CardHeader = styled.h1`
font-size: 4.5rem;
color: ${colors.black};
text-align: left;
`

const CardSubTitle = styled.h2`
    color: ${colors.blackSemi};
    font-size: 2.5rem;
`


const CardId = styled.h2`
font-size: 2rem;
color: ${colors.hardGreen};
text-align: left;
`

const CardFlexContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 1em;
`

const CardAmenities = styled.p`
text-align: center;
background-color: #E8F2EF;
width: 70%;
padding: 1em;
border-radius: 0.5em;
color: #135846;
font-weight: 600;
font-size: 1.5rem;
`
const CardDescription = styled.p`
    
    font-size: 1.5rem;
    color: ${colors.blackSemi};
`
const CardGap = styled.div`
    border-bottom: 2px solid #00000012;
`
