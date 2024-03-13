import styled from "styled-components"
import { colors } from "../../styles/colors"



export const BookingCard = ({booking, room}) => {

    const amenities = room.amenities
    const photos = room.photos

    return(
        <>
            <CardContainer>
                <TextContainer>
                    <div>
                        <CardHeader>{booking.first_name} {booking.last_name}</CardHeader>
                        <CardId>ID #{booking.id}</CardId>
                    </div>
                    <CardGrid>
                        <CardFlexContainer>
                            <CardSubTitle>Check In</CardSubTitle>
                            <CardPar>{booking.check_in}</CardPar>
                        </CardFlexContainer>
                        <CardFlexContainer>
                            <CardSubTitle>Check Out</CardSubTitle>
                            <CardPar>{booking.check_out}</CardPar>
                        </CardFlexContainer>
                        
                    </CardGrid>
                    <CardGap></CardGap>
                        <CardGrid>
                            
                            <CardFlexContainer>
                                <CardSubTitle>Room Info</CardSubTitle>
                                <CardPar>{room.room_type}/{room.room_number}</CardPar>
                            </CardFlexContainer>
                            
                            <CardFlexContainer>
                                <CardSubTitle>Price</CardSubTitle>
                                <CardPar>${room.price} /night</CardPar>
                            </CardFlexContainer>
                        </CardGrid>
                            
                        <CardDescription>{room.description}</CardDescription>
                        <div>
                            <CardSubTitle>Facilities</CardSubTitle>
                            <CardGrid>
                                {amenities.map((element, index) => (
                                        <CardAmenities key={index}>{element}</CardAmenities>
                                    ))}
                            </CardGrid>
                            
                        </div>
                </TextContainer>
                    <CardPicContainer>
                        <img src={photos[0]} alt="" />
                        <CardFlexContainer>
                            <CardSubTitle>Notes</CardSubTitle>
                            <CardPar>{booking.notes}</CardPar>
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

