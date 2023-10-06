import React, { useState } from 'react'
import { PageContainer, PageButton } from './PaginationStyles'

export default function Pagination({ postsPerPage, totalPosts, handlePage }) {
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
          >
            {number}
          </PageButton>
        )
      })}
    </PageContainer>
  )
}
