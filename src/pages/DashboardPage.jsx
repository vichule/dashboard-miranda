import styled from "styled-components"
import { KpiCard } from "../components/KPI/KpiCard"
import { BedKpi, CalendarKpi, ChInKpi, ChOutKpi } from "../styles/icons"
import { colors } from "../styles/colors"


export const Dashboard = () => {


    return (
        <>
            <DashboardContainer>
                <TopContainer>
                    <KpiCard Icon={BedKpi} number={8461} text={'New Booking'}/>
                    <KpiCard Icon={CalendarKpi} number={963} text={'Scheduled Room'}/>
                    <KpiCard Icon={ChInKpi} number={753} text={'Check In'}/>
                    <KpiCard Icon={ChOutKpi} number={516} text={'Check Out'}/>
                    
                </TopContainer>
                <BotContainer>
                    {/*Header Review*/}
                    <h1>Latest Reviews by Customers</h1>
                    {/*Swiper Review*/}
                    <p>Swiper</p>
                </BotContainer>

            </DashboardContainer>
            
        </>
    )
}

const DashboardContainer = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3em;
    height: 100%;
    gap: 2em;
`
const TopContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8em;
`
const BotContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 35rem;
    max-width: 150rem;
    margin: 0 auto;
    width: 100%;
    padding: 2em;
    border-radius: 1em;
    
    background-color: ${colors.white};
`