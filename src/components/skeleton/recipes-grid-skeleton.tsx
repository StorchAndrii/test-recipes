import React from 'react'
import ContentLoader from 'react-content-loader'

function RecipesGridSkeleton(): JSX.Element {
    return (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {new Array(6).fill(0).map((_, index) => (
                <div className="flex flex-col overflow-hidden rounded-xl border border-gray-300 shadow-md" key={index}>
                    <ContentLoader
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                        height="460px"
                        speed={2}
                        style={{ width: '100%', height: '100%' }}
                        viewBox="0 0 100% 100%"
                        width="100%"
                    >
                        <rect height="100%" rx="2" ry="2" width="100%" x="0" y="0" />
                    </ContentLoader>
                </div>
            ))}
        </div>
    )
}

export default RecipesGridSkeleton
