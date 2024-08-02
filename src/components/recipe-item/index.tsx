'use client'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import { useEffect, useRef, useState } from 'react'

import CustomImage from '@/components/custom-image'
import ArrowRight from '@/components/icons/arrow-right'
import { Difficulty, type Recipe } from '@/types'

interface RecipeItemProps {
    recipe: Recipe
}

function RecipeItem({ recipe }: RecipeItemProps): JSX.Element {
    const [currentTag] = useQueryState('tag')
    const [maxTagsToShow, setMaxTagsToShow] = useState(10)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [colorDifficulty, setColorDifficulty] = useState('')

    useEffect(() => {
        const updateMaxTagsToShow = (): void => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth
                const buttonWidth = 120
                const tagsCount = recipe.tags.length

                const tagsToShowWithoutMore = Math.floor(containerWidth / buttonWidth)

                setMaxTagsToShow(tagsToShowWithoutMore >= tagsCount ? tagsCount : tagsToShowWithoutMore)
            }
        }
        updateMaxTagsToShow()
        window.addEventListener('resize', updateMaxTagsToShow)

        return () => {
            window.removeEventListener('resize', updateMaxTagsToShow)
        }
    }, [recipe.tags])

    useEffect(() => {
        switch (recipe.difficulty) {
            case Difficulty.Easy:
                setColorDifficulty('text-green-500')
                break
            case Difficulty.Medium:
                setColorDifficulty('text-yellow-500')
                break
            case Difficulty.Hard:
                setColorDifficulty('text-red-500')
                break
            default:
                setColorDifficulty('text-black')
        }
    }, [recipe.difficulty])
    return (
        <div className="rounded-xl border border-gray-300 p-4 shadow-md" ref={containerRef}>
            <CustomImage image={recipe.image} maxHeight="40%" maxWidth="100%" />
            <div>
                <div className="mt-4 flex flex-nowrap">
                    {recipe.tags.slice(0, maxTagsToShow).map((tag) => (
                        <Link
                            className={`mr-2 whitespace-nowrap rounded-full px-3 py-1 text-sm text-white transition-all duration-200 ease-in hover:bg-gray-600 ${currentTag === tag.toLowerCase() ? 'bg-gray-600' : 'bg-black'}`}
                            href={`/recipes?page=1&tag=${tag.toLowerCase()}`}
                            key={tag}
                        >
                            {tag}
                        </Link>
                    ))}
                    {recipe.tags.length > maxTagsToShow && (
                        <span className="mr-2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-sm text-white transition-all duration-200 ease-in hover:bg-gray-600">
                            +{recipe.tags.length - maxTagsToShow} more
                        </span>
                    )}
                </div>
                <h2 className="mt-4 text-xl font-bold">{recipe.name}</h2>
                <p className="mt-2 line-clamp-2 text-lg opacity-80">{recipe.ingredients.join(', ')}</p>
                <p className="mt-4 text-base opacity-80">
                    Difficulty: <span className={colorDifficulty}>{recipe.difficulty}</span>
                </p>
                <p className="mt-1 text-base opacity-80">Cuisine: {recipe.cuisine}</p>
            </div>
            <button className="mt-4 flex w-full items-center rounded-lg border border-gray-300 px-4 py-2 transition-all duration-200 ease-in hover:bg-gray-100" type="button">
                <div className="w-full font-semibold"> View recipe</div>
                <ArrowRight />
            </button>
        </div>
    )
}

export default RecipeItem
