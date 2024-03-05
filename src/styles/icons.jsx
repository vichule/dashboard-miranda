import styled from "styled-components";

import { IoIosArrowDown } from "react-icons/io"; 
import { IoIosArrowBack } from "react-icons/io"; 
import { BsHighlights } from "react-icons/bs"; 
import { HiOutlineMail } from "react-icons/hi"; 
import { GoBell } from "react-icons/go"; 
import { HiOutlineLogout } from "react-icons/hi"; 


 const Bell = styled(GoBell)``
 const ArrowClosed = styled(IoIosArrowBack)``
 const ArrowOpened = styled(IoIosArrowDown)``
 const Mail = styled(HiOutlineMail)``
 const Logout = styled(HiOutlineLogout)``
 const Lights = styled(BsHighlights)``

 export const icons = {
    bell: <Bell/>,
    arrowClose: <ArrowClosed/>,
    arrowOpen: <ArrowOpened/>,
    mail: <Mail/>,
    logout: <Logout/>,
    lights: <Lights/>,
 }