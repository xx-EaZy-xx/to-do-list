import React from 'react'
import { PageContainer, PageButton } from './PaginationStyles'

export default function Pagination({
  postsPerPage,
  totalPosts,
  handlePage,
  currentPage,
}) {
  const pageCount = Math.ceil(totalPosts / postsPerPage)
  const pageNumbers = Array.from({ length: pageCount }).map(
    (el, index) => index + 1
  )

  return (
    <PageContainer>
      {pageNumbers.map((number) => {
        return (
          <PageButton
            key={number}
            onClick={() => {
              handlePage(number)
            }}
            current={number === currentPage ? true : false}
          >
            {number}
          </PageButton>
        )
      })}
    </PageContainer>
  )
}
