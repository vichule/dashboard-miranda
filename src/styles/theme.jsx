
import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";



export const lightTheme = {
    main: colors.white,
    mainText: colors.black,
    subText: colors.lightGreen,
    subMain: colors.white
}

export const darkTheme = {
    main: colors.black,
    mainText: colors.white,
    subText: colors.lightGrey,
    subMain: colors.darkWhite
}

export const GlobalStyles = createGlobalStyle`
    :root {
        background-color: ${colors.white};
        color: ${colors.black};
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 10px;
        font-family: 'Poppins', sans-serif;
    }
`;