/* #region  Modules */
import React from "react"
import LineSpacing from "components/LineSpacing"
import withUserCredentials from "../../../lib/withUserCredentials"
import TableView from "components/database/TableView"
import MainContainer from "components/MainContainer"
import { withRouter } from "next/router"
import TopBar from "../../components/TopBar"
/* #endregion */

export default withRouter((props) => {
    return <React.Fragment>
        <TopBar user={props.user}/>
        <MainContainer>
            <LineSpacing />
            <TableView
                table={props.router.query.table}
                onMapFields={(_, columnName, fieldProps, fieldValues) => {
                    if (props.router.query.table == "users") {
                        fieldProps.enabled = true
                        if (columnName == "status") {
                            fieldProps.enabled = false

                            if (fieldValues.status == "active" ||
                                fieldValues.status == "blocked")
                                fieldProps.enabled = true
                            else
                                if (!fieldValues.id)
                                    fieldProps.message = "An email will be sent to the user to set and authenticate their password"
                                else
                                    fieldProps.message = "The user has not yet activated his account"
                        }
                    }

                    return fieldProps
                }} />
            <LineSpacing />
        </MainContainer>
    </React.Fragment>
})

export const getServerSideProps = withUserCredentials()