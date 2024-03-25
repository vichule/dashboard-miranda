import styled from "styled-components"
import { KpiCard } from "../components/KPI/KpiCard"
import { BedKpi, CalendarKpi, ChInKpi, ChOutKpi } from "../styles/icons"
import { colors } from "../styles/colors"

import { SwiperReview } from "../components/Swipers/SwiperReview.jsx"

export const Dashboard = () => {


    return (
        <>
            <DashboardContainer>
                <TopContainer>
                    <KpiCard Icon={BedKpi} number={8461} text={'New Booking'}/>
                    <KpiCard Icon={CalendarKpi} number={963} text={'Scheduled Room'}/>
                    <KpiCard Icon={ChOutKpi} number={753} text={'Check In'}/>
                    <KpiCard Icon={ChInKpi} number={516} text={'Check Out'}/>
                    
                </TopContainer>
                <BotContainer>
                    <HeaderReview>Latest Reviews by Customers</HeaderReview>
                    
                    <SwiperReview/>
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
    height: 87rem;
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
    justify-content: space-between;
    
    background-color: ${colors.white};
`

const HeaderReview = styled.h1`
    text-align: left;
    font-size: 1.5rem;
    margin: 2em;
    font-weight: 500;
`