import React from 'react'
import { PageContainer, PageButton } from './Pagination.styled'

export default function Pagination({
  tasksPerPage,
  totalTasks,
  page,
  setPage,
}) {
  const pageCount = Math.ceil(totalTasks / tasksPerPage)
  const pageNumbers = Array.from({ length: pageCount }).map(
    (el, index) => index + 1
  )
  //Хэндлер пагинации
  function handlePage(arg) {
    setPage(arg)
  }

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
