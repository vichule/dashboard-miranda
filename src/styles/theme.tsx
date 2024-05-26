
import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";



export const lightTheme = {
    main: colors.white,
    mainText: colors.black,
    subText: colors.lightGreen,
    subMain: colors.white,
    bg: colors.whiteSemi,
    bgSecond: colors.white,
    bgCard: colors.white,
    btnBg: colors.whiteSemi,
    btnText: colors.hardGreen,
    bgKpi: colors.lightRed
}

export const darkTheme = {
    main: colors.black,
    mainText: colors.white,
    subText: colors.white,
    subMain: colors.darkWhite,
    bg: colors.black,
    bgSecond: colors.blackGrey,
    bgCard: colors.blackSemi,
    btnBg: colors.hardGreen,
    btnText: colors.white,
    bgKpi: colors.redSemi
}

export const GlobalStyles = createGlobalStyle`
    :root {
        background-color: ${({theme}) => theme.bg};
        color: ${({theme}) => theme.mainText}
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 10px;
        font-family: 'Poppins', sans-serif;
    }
`;