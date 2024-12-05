import MainContainer from "components/MainContainer"
import SimpleFlexContainer from "components/SimpleFlexContainer"
import NavBarButton from "./NavBarButton"

import { FaUserAlt } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { FiClipboard } from 'react-icons/fi'

export default function NavBar() {
    return <div style={{
            width: "100%",
            background: "white",
            borderTopLeftRadius: "50px",
            borderTopRightRadius: "50px",
            paddingTop: "20px",
            position: "fixed",
            bottom: "0",
            boxShadow: "0 -10px 25px rgba(0, 0, 0, .05)"
        }}>
        <MainContainer>
            <SimpleFlexContainer>
                <NavBarButton icon={<HiHome />} />
                <NavBarButton icon={<FiClipboard />} />
                <NavBarButton icon={<FaUserAlt />} />
                {/* <NavBarButton icon={<AiFillAlert/>} text="Botão 4"/> */}
            </SimpleFlexContainer>
        </MainContainer>
    </div>
}