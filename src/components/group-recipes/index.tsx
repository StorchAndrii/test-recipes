import RecipeItem from '@/components/recipe-item'
import { getRecipes } from '@/lib/api'

interface GroupRecipesProps {
    // recipes: Recipe[]
    page: number
    tag: string
}

export default async function GroupRecipes({ page, tag }: GroupRecipesProps): Promise<JSX.Element> {
    const data = await getRecipes({ page, tag })

    return (
        <div>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
                {data.recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <RecipeItem recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
