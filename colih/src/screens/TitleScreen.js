import React from "react"
import TitleBar from "../components/TitleBar"
import NavBar from "../components/NavBar"
import MainContainer from "components/MainContainer"

export default function TitleScreen(props) {
    return <React.Fragment>
        <main style={{
                height: "100vh",
                maxHeight: "100%",
                overflowX: "hidden",
                perspective: "1px",
                perspectiveOrigin: "center top",
                transformStyle: "preserve-3d"
            }}>
            <TitleBar title={props.title} href={props.href}/>            
                <div style={{
                    minHeight: "100vh",
                    transform: "translateZ(0)",
                    width: "100%",
                    marginTop: "70px",
                    background: props.background,
                    borderTopLeftRadius: "50px",
                    borderTopRightRadius: "50px",
                    paddingTop: "20px",
                    paddingBottom: "300px"
                }}>
                <MainContainer>
                    {props.children}
                </MainContainer>
            </div>
        </main>
        <NavBar/>
    </React.Fragment>
}