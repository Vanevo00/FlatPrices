import React, { useEffect, useState } from 'react'
import { PaginatorContainer, PaginatorItem, PaginatorItemWhite } from './StyledPaginator'

interface Props {
  pageLimit: number
  count: number
  maxPages: number
  loading: boolean
  callback: Function
}

const Paginator = ({pageLimit, count, maxPages, loading, callback}: Props) => {
  const [activePage, setActivePage] = useState(1)
  const pageCount = Math.ceil(count / pageLimit)

  const onClick = (page) => {
    if (page === '...') {
      return
    }
    setActivePage(page)
  }

  useEffect(() => {
    callback(activePage)
  }, [activePage])

  const renderNumberedPages = () => {
    const showedPages = []
    if (pageCount > maxPages) {
      if (activePage > (pageCount - maxPages)) {
        showedPages.push(1)
        showedPages.push('...')
        for (const page of Array(maxPages).keys()) {
          showedPages.push(pageCount - maxPages + page + 1)
        }
      } else if (activePage > (maxPages / 2)) {
        showedPages.push(1)
        showedPages.push('...')
        for (const page of Array(maxPages - 2).keys()) {
          showedPages.push(activePage - (maxPages/2) + page + 2)
        }
        showedPages.push('...')
        showedPages.push(pageCount)
      } else {
        for (const page of Array(maxPages - 1).keys()) {
          showedPages.push(page + 1)
        }
        showedPages.push('...')
        showedPages.push(pageCount)
      }
    } else {
      for (const page of Array(pageCount).keys()) {
        showedPages.push(page + 1)
      }
    }

    if (showedPages.length < 2) {
      return null
    }

    return (
      showedPages.map((page, index) =>
        <PaginatorItemWhite key={index} active={page === activePage} onClick={() => onClick(page)}>{page}</PaginatorItemWhite>
      )
    )
  }

  if (loading) {
    return null
  }

  return (
    <PaginatorContainer>
      {pageCount > 1 && <PaginatorItem onClick={() => onClick(activePage - 1)}>&lt;</PaginatorItem>}
      {renderNumberedPages()}
      {pageCount > 1 && <PaginatorItem onClick={() => onClick(activePage + 1)}>&gt;</PaginatorItem>}
    </PaginatorContainer>
  )
}

export default Paginator
