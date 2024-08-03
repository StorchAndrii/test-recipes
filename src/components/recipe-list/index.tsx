import React from 'react'

interface RecipeListProps {
    title: string
    list: string[] | []
    isNumbered?: boolean
}

function RecipeList({ title, list, isNumbered }: RecipeListProps): JSX.Element {
    return (
        <div>
            <h3 className="text-3xl font-bold">{title}</h3>
            <ol className={`ml-5 ${isNumbered ? 'list-decimal' : ''} `}>
                {list.map((instruction) => (
                    <li className="font-bold" key={instruction}>
                        <span className="ml-2 font-medium"> {instruction}</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default RecipeList
