import Link from 'next/link'
import MainContainer from "components/MainContainer"
import Button from "components/Button"
import LineSpacing from "components/LineSpacing"
import HScroll from "components/HScroll"
import ActionButton from "components/ActionButton"

import { FiSearch } from 'react-icons/fi'
import { MdWbTwilight, MdOutlineWarningAmber } from 'react-icons/md'
import { IoMdNotifications } from 'react-icons/io'
import { BiAddToQueue } from 'react-icons/bi'
import { TbNewSection } from 'react-icons/tb'
import { GrDocumentCsv } from 'react-icons/gr'

export default function TopBar(props) {
    return <div style={{
        width: "100%",
        background: "white",
        borderBottomLeftRadius: "50px",
        borderBottomRightRadius: "50px"
    }}>
        <MainContainer>
            <div style={{
                paddingTop: "10px",
                display: "grid",
                gridTemplateColumns: "70px 100px 1fr auto"
            }}>
                <Link href="/profile">
                    <img
                        style={{
                            cursor: "pointer",
                            gridColumn: "1",
                            borderRadius: "35px",
                            objectFit: "cover",
                            background: "gray"
                        }}
                        width="70"
                        height="70"
                        src={props.user.img_src} />
                </Link>
                <div style={{
                    gridColumn: "2",
                    alignContent: "center",
                    paddingLeft: "15px"
                }}><div style={{
                    fontSize: "24pt"
                }}>{props.user != null ? props.user.nome.split(" ")[0] : ""}</div></div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "80px 80px",
                    columnGap: "10px",
                    gridColumn: "4"
                }}>
                    {parseInt(props.user.nivel) < 4 &&
                        <Link href="/emergency" style={{ gridColumn: "1" }}>
                            <Button style="danger">
                                <MdWbTwilight style={{ fontSize: "22pt" }} />
                            </Button>
                        </Link>}
                    <Link href="/notifications" style={{ gridColumn: "2" }}>
                        <Button>
                            <IoMdNotifications style={{ fontSize: "20pt" }} />
                            {props.count > 0 && ` ${props.count}`}
                        </Button>
                    </Link>
                </div>
            </div>
            <LineSpacing />
            <HScroll>
                <Link href="/new-case"><ActionButton icon={<TbNewSection />}>Novo<br />Caso</ActionButton></Link>
                <Link href="/schedule"><ActionButton icon={<BiAddToQueue />}>Novo<br />Agend.</ActionButton></Link>
                <Link href="/list"><ActionButton icon={<FiSearch />}>Pesquisar<br />Médico</ActionButton></Link>
                <Link href="/emergency"><ActionButton icon={<MdOutlineWarningAmber />}>Informar<br />Ocorrência</ActionButton></Link>
                <Link href="/csv"><ActionButton icon={<GrDocumentCsv />}>Enviar<br />CSV</ActionButton></Link>
            </HScroll>
            <Link href="/list">
                {/* <Button style="light"><FiSearch style={{ marginRight: "5px" }} /> Pesquisar</Button> */}
            </Link>
        </MainContainer>
        <LineSpacing />
    </div>
}