/* #region  Modules */
import React, { Component } from 'react'
import styled from 'styled-components'
import { freezeText } from '../StaticStyles'
import { HiOutlineChevronDoubleLeft, HiArrowLeft, HiArrowRight, HiOutlineChevronDoubleRight } from 'react-icons/hi'
import Button from '../Button'
/* #endregion */

const Pagination = styled.ul({
    padding: 0,
    listStyleType: "none",
    "li": {
        display: "inline-block",
        margin: "0 5px",
        "div": {
            minWidth: "60px"
        }
    },
    ...freezeText
})

export default class PaginationView extends Component {

    /* #region  Setup */
    constructor(props) {
        super(props)

        this.lastPage = 1
    }
    /* #endregion */

    render() {
        const currentPage = this.props.page
        const totalPages = this.props.totalPages

        const pages = []
        const maxPagesToShow = this.props.maxToShow ?? 10

        const initialPageNumber = (Math.floor(currentPage / maxPagesToShow) + (currentPage % maxPagesToShow == 0 ? -1 : 0)) * maxPagesToShow

        const isFirst = initialPageNumber + maxPagesToShow <= maxPagesToShow
        const isLast = initialPageNumber + maxPagesToShow >= totalPages

        var restingPagesCount = totalPages % maxPagesToShow
        restingPagesCount = restingPagesCount > 0 ? restingPagesCount : maxPagesToShow

        const pagesToShowCount = isLast ? restingPagesCount : maxPagesToShow

        var pageNumber = initialPageNumber + 1
        while (pageNumber <= initialPageNumber + pagesToShowCount) {
            pages.push(this.generatePaginationItem(pageNumber, pageNumber == currentPage))
            pageNumber++
        }

        return <Pagination>
            {!isFirst &&
                <React.Fragment>
                    <li>
                        <Button style="light" onClick={() => { this.gotoPage(1) }} ><HiOutlineChevronDoubleLeft /></Button>
                    </li>
                    <li>
                        <Button style="light" onClick={() => { this.gotoPage(currentPage - 1) }} ><HiArrowLeft /></Button>
                    </li>
                </React.Fragment>}
            {pages}
            {!isLast &&
                <React.Fragment>
                    <li>
                        <Button style="light" onClick={() => { this.gotoPage(currentPage + 1) }} ><HiArrowRight /></Button>
                    </li>
                    <li>
                        <Button style="light" onClick={() => { this.gotoPage(totalPages) }} ><HiOutlineChevronDoubleRight /></Button>
                    </li>
                </React.Fragment>}
        </Pagination>
    }

    /* #region  Functions */
    generatePaginationItem(value, isActive) {
        return <li>
            <Button
                style={!isActive && "light"}
                onClick={() => { this.gotoPage(value) }}>{value}</Button>
        </li>
    }

    gotoPage(page) {
        if (page != this.lastPage)
            if (this.props.onChangePage)
                this.props.onChangePage(page)

        this.lastPage = page
    }
    /* #endregion */

}