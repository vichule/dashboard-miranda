import styled from "styled-components"
import { TopMenu } from "../components/top-menu/topmenu"
import { LateralMenu } from "../components/lateral-menu/lateralmenu"
import { Outlet } from "react-router-dom"
import { useState } from "react"


export const Layout = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true)
    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen)
      }

    return (
        <>
            <LayoutStyled>
                <LateralMenu isOpen={isSideMenuOpen}/>
                <ColumnStyled>
                    <TopMenu toggleMenu={toggleSideMenu} isSideMenuOpen={isSideMenuOpen}/>
                    <Outlet/>
                </ColumnStyled>
            </LayoutStyled>
        
        </>
    )
}


export const LayoutStyled = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const ColumnStyled = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;

`