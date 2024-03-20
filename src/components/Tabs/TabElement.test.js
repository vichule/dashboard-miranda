import { render } from "@testing-library/react"
import TabLi from "./TabsStyled"


describe('Tabs ', () =>{

    it('Should be grey color if not active', () =>{
        render(<TabLi onClick={()=> {}} isActive={false}/>)
        const tabClass = TabLi({}).type.styledComponentId
        const element = document.getElementsByClassName(tabClass)
        const style = window.getComputedStyle(element[0])
        expect(style.color).toBe('rgb(120, 120, 120)')
    })

    it('Should be hardgreen color if its active', () =>{
        render(<TabLi onClick={()=> {}} isActive={true}/>)
        const tabClass = TabLi({}).type.styledComponentId
        const element = document.getElementsByClassName(tabClass)
        const style = window.getComputedStyle(element[0])
        expect(style.color).toBe('rgb(19, 88, 70)')
    })

    it('Should have border bottom grey if not active', () =>{
        render(<TabLi onClick={()=> {}} isActive={false}/>)
        const tabClass = TabLi({}).type.styledComponentId
        const element = document.getElementsByClassName(tabClass)
        const style = window.getComputedStyle(element[0])
        expect(style.borderBottom).toBe('1px solid rgb(120, 120, 120)')
    })
})