import React from 'react'
import { PageContainer, PageButton } from './Pagination.styled'

export default function Pagination({
  tasksPerPage,
  totalTasks,
  handlePage,
  page,
}) {
  const pageCount = Math.ceil(totalTasks.length / tasksPerPage)
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
            current={number === page ? true : false}
          >
            {number}
          </PageButton>
        )
      })}
    </PageContainer>
  )
}
