import styled from "styled-components";
import { colors } from "./colors";

import { IoIosArrowDown } from "react-icons/io"; 
import { IoIosArrowBack } from "react-icons/io"; 
import { BsHighlights } from "react-icons/bs"; 
import { HiOutlineMail } from "react-icons/hi"; 
import { GoBell } from "react-icons/go"; 
import { HiOutlineLogout } from "react-icons/hi"; 
import { HiOutlineLogin } from "react-icons/hi"; //<HiOutlineLogin />
import { MdBed } from "react-icons/md"; //<MdBed />
import { TbCalendarCheck } from "react-icons/tb"; //<TbCalendarCheck/>


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

   const KpiStyledIcons =`
      width:28px;
      height:28px;
      color: ${colors.red};
      cursor:pointer;
      &:hover{
         color: ${colors.white};
      }
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


   export const BedKpi = styled(MdBed)`
      ${KpiStyledIcons}
   `
   export const CalendarKpi = styled(TbCalendarCheck)`
      ${KpiStyledIcons}
   `
   export const ChOutKpi = styled(HiOutlineLogout)`
      ${KpiStyledIcons}
   `
   export const ChInKpi = styled(HiOutlineLogin)`
      ${KpiStyledIcons}
   `

   export const icons = {
      bell: <Bell/>,
      arrowClose: <ArrowClosed/>,
      arrowOpen: <ArrowOpened/>,
      mail: <Mail/>,
      logout: <Logout/>,
      lights: <LightsOn/>,
   }