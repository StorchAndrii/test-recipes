'use client'
import React from 'react'
import ContentLoader from 'react-content-loader'

function RecipesGrid() {
    return (
        <ContentLoader backgroundColor="#f3f3f3" foregroundColor="#ecebeb" height="100%" viewBox="0 0 680 575" width="100%">
            <rect height="211" rx="2" ry="2" width="211" x="12" y="58" />
            <rect height="211" rx="2" ry="2" width="211" x="240" y="57" />
            <rect height="211" rx="2" ry="2" width="211" x="467" y="56" />
            <rect height="211" rx="2" ry="2" width="211" x="12" y="283" />
            <rect height="211" rx="2" ry="2" width="211" x="240" y="281" />
            <rect height="211" rx="2" ry="2" width="211" x="468" y="279" />
        </ContentLoader>
    )
}

export default RecipesGrid
