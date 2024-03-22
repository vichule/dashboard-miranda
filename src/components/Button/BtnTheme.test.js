import { render } from "@testing-library/react"
import Btn from "./BtnTheme"


describe('Button', () => {
    it('Per default has black color', () =>{
        render(<Btn onClick={()=> {}} isActive={true}/>)
        const btnClass = Btn({}).type.styledComponentId
        const element = document.getElementsByClassName(btnClass)
        const style = window.getComputedStyle(element[0])
        expect(style.color).toBe('rgb(0, 0, 0)')
    })

    it('If is clicked switch to yellow color', () =>{
        render(<Btn onClick={()=> {}} isActive={false}/>)
        const btnClass = Btn({}).type.styledComponentId
        const element = document.getElementsByClassName(btnClass)
        const style = window.getComputedStyle(element[0])
        expect(style.color).toBe('rgb(251, 159, 68)')
    })

})