import React, { useState, useRef } from 'react'
import { PageContainer, PageButton } from './PaginationStyles'

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const [pageIsActive, setPageIsActive] = useState(false)

  const pageCount = Math.ceil(totalPosts / postsPerPage)
  const pageNumbers = Array.from({ length: pageCount }).map(
    (el, index) => index + 1
  )

  function handlePageIsActive() {
    setPageIsActive(!pageIsActive)
  }

  return (
    <PageContainer>
      {pageNumbers.map((number) => {
        return (
          <PageButton
            key={number}
            onClick={() => {
              paginate(number)
              handlePageIsActive()
            }}
            active={false}
          >
            {number}
          </PageButton>
        )
      })}
    </PageContainer>
  )
}
