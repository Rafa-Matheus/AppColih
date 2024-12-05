/* #region  Modules */
import LineSpacing from 'components/LineSpacing'
import MainContainer from 'components/MainContainer'
import CenterPanel from 'components/CenterPanel'
import React from 'react'
/* #endregion */

export default (props) => {
    return (
        <React.Fragment>
            {/* <LogoBar img="/assets/parkplus.png" /> */}
            <MainContainer>
                <center>
                    <CenterPanel>{props.children}</CenterPanel>
                </center>
            </MainContainer>
            <LineSpacing height="100px" />
            {/* <Footer>
                <div style={{ color: "#777" }}>ParkPlus Web App v1.0</div>
                <LineSpacing />
            </Footer> */}
        </React.Fragment>
    )
}