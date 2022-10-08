/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Pagination({
	dataPerPage,
	totalPosts,
	paginateFront,
	paginateBack,
	currentPage,
}) {
	return (
		<div className='pagination-container'>
			<div>
				<p className='d-flex gap-1'>
					Showing
					<span className='font-medium'>
						<strong>{currentPage * dataPerPage - 5}</strong>
					</span>
					to
					<span className='font-medium'>
						{' '}
						<strong>{currentPage * dataPerPage}</strong>{' '}
					</span>
					of
					<span className='font-medium'>
						{' '}
						<strong>{totalPosts}</strong>{' '}
					</span>
					results
				</p>
			</div>
			<nav className='block'></nav>
			<div>
				<nav className='d-flex gap-2' aria-label='Pagination'>
					<a
						onClick={() => {
							paginateBack()
						}}
						href='#'
						className='btn btn-sm px-4 py-2'>
						<span aria-hidden='true'>&laquo;</span>
					</a>

					<a
						onClick={() => {
							paginateFront()
						}}
						href='#'
						className='btn btn-sm px-4 py-2'>
						<span aria-hidden='true'>&raquo;</span>
					</a>
				</nav>
			</div>
		</div>
	)
}
