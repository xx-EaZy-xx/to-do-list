import React, { useState, useEffect } from 'react'
import { PageContainer, PageButton } from './PaginationStyles'

export default function Pagination({ tasks, setTasks }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPosts, setCurrentPosts] = useState([])
  const [postsPerPage] = useState(10)

  const paginate = (pageNumber) => {
    const pageCount = Math.ceil(tasks.length / postsPerPage)
    const indexOfLastPost = pageNumber * postsPerPage
    const indexOfFirstPost = postsPerPage * (pageNumber - 1)
    const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost)

    setCurrentPosts(currentPosts)
    setCurrentPage(pageCount < currentPage ? pageCount : pageNumber)
  }

  useEffect(() => {
    paginate(currentPage)
  }, [tasks])

  return (
    <PageContainer>
      <PageButton
        onClick={() => {
          paginate(currentPage)
        }}
      >
        {currentPage}
      </PageButton>
    </PageContainer>
  )
}
