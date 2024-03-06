import styled from "styled-components";

import { IoIosArrowDown } from "react-icons/io"; 
import { IoIosArrowBack } from "react-icons/io"; 
import { BsHighlights } from "react-icons/bs"; 
import { HiOutlineMail } from "react-icons/hi"; 
import { GoBell } from "react-icons/go"; 
import { HiOutlineLogout } from "react-icons/hi"; 
import { colors } from "./colors";

const TopMenuStyle =`
    width: 24px;
    height: 24px;
    color: ${colors.hardGreen};
    cursor:pointer;
`
const themeIconsStyle =`
   width: 24px;
   height: 24px;
   cursor:pointer;
`
 export const Bell = styled(GoBell)`
   ${TopMenuStyle}
 `
 export const ArrowClosed = styled(IoIosArrowBack)`
   ${TopMenuStyle}
 `
 export const ArrowOpened = styled(IoIosArrowDown)`
 ${TopMenuStyle}
`
 export const Mail = styled(HiOutlineMail)`
 ${TopMenuStyle}
`
 export const Logout = styled(HiOutlineLogout)`
 ${TopMenuStyle}
`
 export const LightsOn = styled(BsHighlights)`
   ${themeIconsStyle}
   
 `

 export const LightsOff = styled(BsHighlights)`
   ${themeIconsStyle}
   color: ${colors.hardOrange};
 `

 export const icons = {
    bell: <Bell/>,
    arrowClose: <ArrowClosed/>,
    arrowOpen: <ArrowOpened/>,
    mail: <Mail/>,
    logout: <Logout/>,
    lights: <LightsOn/>,
 }