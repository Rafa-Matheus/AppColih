import { IoIosArrowForward } from 'react-icons/io'
import React from 'react'
import TitleDescription from './TitleDescription'

export default function ListItem(props) {
    return <div style={{ 
            display: "grid",
            gridTemplateColumns: "60px 1fr 60px",
            gridTemplateRows: "auto",
            rowGap: "20px",
            width: "100%"
        }}>
            <div style={{
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                gridRow: "1 / 2",
                gridColumn: "1" }}>
                <div style={{ 
                    borderRadius: "15px",
                    width: "60px",
                    height: "60px",
                    overflow: "clip",
                    color: props.color ?? "#434957",
                    background: props.background ?? "#EBEEFD",
                    textAlign: "center",
                    lineHeight: "75px",
                    fontSize: "24pt",
                    display: props.hideIcon != undefined ? "none" : "block"
                }}>{props.icon}</div>
            </div>
        <div
            style={{
                display: "grid",
                minWidth: "0",
                gridRow: "1",
                gridColumn: "2",
                marginLeft: "10px",
                gridTemplateRows: "auto",
                rowGap: "15px" }}>
                {props.customContent ?? 
                <TitleDescription
                    title={props.title} 
                    description={props.description}/>}
            </div>
        {props.action && 
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                gridRow: "1 / 2",
                gridColumn: "3" }}>
                <div style={{ 
                    cursor: "pointer",
                    borderRadius: "15px",
                    width: "60px",
                    height: "60px",
                    color: props.color ?? "#434957",
                    background: props.background ?? "#EBEEFD",
                    textAlign: "center",
                    lineHeight: "75px",
                    fontSize: "18pt"
                }} onClick={props.action}>{props.actionIcon ?? <IoIosArrowForward/>}</div>
            </div>}
        {props.children &&
        <div style={{ gridRow: "2", gridColumn: "1 / 4" }}>
            {props.children}
        </div>}
    </div>
}