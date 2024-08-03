import { type Metadata } from 'next'

import CustomImage from '@/components/custom-image'
import RecipeList from '@/components/recipe-list'
import { getRecipe } from '@/lib/api'

import type { Recipe } from '@/types'

interface MetadataProps {
    params: { id: string }
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const id = params.id

    const recipe = await getRecipe({ id })
    let pageTitle = 'Recipe'

    if (recipe) {
        pageTitle = recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)
    }

    return {
        title: pageTitle,
    }
}

async function responsePage(id: string): Promise<Recipe | null> {
    try {
        return await getRecipe({ id })
    } catch (error) {
        return null
    }
}

interface RecipePageProps {
    params: {
        id: string
    }
}

export default async function RecipePage({ params: { id } }: RecipePageProps): Promise<JSX.Element> {
    const recipe = await responsePage(id)
    const { name, image, ingredients, instructions, rating } = recipe ?? { name: '', image: '', ingredients: [], instructions: [], rating: 0 }
    return (
        <main className="m-0 p-6">
            <h1 className="text-center text-5xl font-bold">{name}</h1>
            <div className="mt-8 flex flex-col gap-8 lg:flex-row 2xl:justify-center">
                <div>
                    <CustomImage alt={name} image={image} maxHeight="100%" maxWidth="100%" />
                </div>
                <div className="space-y-10">
                    <RecipeList list={ingredients} title="Ingredients:" />
                    <RecipeList isNumbered list={instructions} title="Instructions:" />
                    <div className="mt-8">Rating: {rating}</div>
                </div>
            </div>
        </main>
    )
}
