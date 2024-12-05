import { MdArrowBackIosNew } from 'react-icons/md'
import Link from "next/link"

export default function TitleBar(props) {
    return <div style={{
        position: "relative",
        verticalAlign: "top",
        transformOrigin: "center top",
        transform: "translateZ(-1px) scale(2)",
        zIndex: "-1"
        }}>
        <center style={{ paddingTop: "70px" }}>
            <Link href={props.href ?? ""}>
                <div style={{ 
                    cursor: "pointer",
                    display: "inline-block",
                    fontSize: "20pt" }}><MdArrowBackIosNew /></div>
            </Link>
            <div style={{ 
                display: "inline-block", 
                fontSize: "20pt",
                marginLeft: "100px",
                marginRight: "130px",
                transform: "translateY(-5px)",
                lineHeight: "30px" }}>{props.title}</div>
        </center>
    </div>
}