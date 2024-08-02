import RecipeItem from '@/components/recipe-item'
import { type Recipe } from '@/types'

interface GroupRecipesProps {
    page: number
    tag?: string
    recipes: Recipe[]
}

export default async function GroupRecipes({ page, tag, recipes }: GroupRecipesProps): Promise<JSX.Element> {
    // const data = await getRecipes({ page, tag })
    return (
        <div>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <RecipeItem recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
