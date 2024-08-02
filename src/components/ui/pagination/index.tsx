'use client'
import { useRouter } from 'next/navigation'

import { PAGE_SIZE } from '@/constants'

interface PaginationProps {
    currentPage: number
    tag: string
    total: number
}
function Pagination({ currentPage, tag, total }: PaginationProps): JSX.Element {
    const router = useRouter()
    const totalPages = Math.ceil(total / PAGE_SIZE)
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage || i === currentPage - 1 || i === currentPage + 1 || (currentPage === 1 && i <= 3) || (currentPage === totalPages && i >= totalPages - 2)) {
            pages.push(i)
        }
    }

    const handlePrevious = (page: number): void => {
        if (currentPage > 1) {
            router.push(`/recipes?page=${page.toString()}${tag ? `&tag=${tag}` : ''}`)
        }
    }

    const handleNext = (page: number): void => {
        if (currentPage < totalPages) {
            router.push(`/recipes?page=${page.toString()}${tag ? `&tag=${tag}` : ''}`)
        }
    }

    const handlePageChange = (page: number): void => {
        router.push(`/recipes?page=${page.toString()}${tag ? `&tag=${tag}` : ''}`)
    }
    return (
        <div className="mt-6 flex items-center justify-center space-x-2">
            <button
                className={`px-4 py-2 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : ''}`}
                disabled={currentPage === 1}
                type="button"
                onClick={() => {
                    handlePrevious(currentPage - 1)
                }}
            >
                {'<'} Previous
            </button>

            {pages.map((page) => (
                <button
                    className={`rounded px-4 py-2 ${page === currentPage ? 'border text-black' : 'bg-white'}`}
                    key={page}
                    type="button"
                    onClick={() => {
                        handlePageChange(page)
                    }}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-4 py-2 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : ''}`}
                disabled={currentPage === totalPages}
                type="button"
                onClick={() => {
                    handleNext(currentPage + 1)
                }}
            >
                Next {'>'}
            </button>
        </div>
    )
}

export default Pagination
