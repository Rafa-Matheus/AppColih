const root = {
    //Colors
    primaryColor: "#1f63d1",
    primaryColorLight: "#4287f5",
    primaryColorDark: "#174a9c",
    neutralColor: "#ccc",
    dangerColor: "#eb4034",
    dangerColorLight: "#f5392c",
    dangerColorDark: "#8c1d15",
    textColor: "#222",
    boxShadowColor: "rgb(0, 0, 0, .1)",

    //Sizes
    minimumSize: "70px",
    gridSpacing: "10px",
    spacing: "30px",
    borderRadius: "20px",
    height: "60px",
    strokeWidth: "2px",

    //Font Sizes
    fontSmallSize: "16pt",
    fontMediumSize: "22pt",
    fontBigSize: "28pt",
}

export default root

export const freezeText = {
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
}

export const easeEffect = {
    transitionDuration: ".3s",
    transitionTimingFunction: "cubic-bezier(.46, .47, .4, .93)"
}

export const formInputStyles = {
    width: "100%",
    height: root.height,
    paddingLeft: root.borderRadius,
}

export const formInputLeftStyles = {
    gridColumn: "1",
    borderTopLeftRadius: root.borderRadius,
    borderBottomLeftRadius: root.borderRadius,
    borderRight: "none"
}

export const formInputAddonStyles = {
    border: `${root.strokeWidth} solid ${root.neutralColor}`,
    color: root.textColor,
    fontSize: root.fontMediumSize
}

export const boxShadow = {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
}

export const strongBoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
}