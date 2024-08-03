import RecipeItem from '@/components/recipe-item'
import { type Recipe } from '@/types'

interface GroupRecipesProps {
    recipes: Recipe[]
}

export default function GroupRecipes({ recipes }: GroupRecipesProps): JSX.Element {
    // const data = await getRecipes({ page, tag })
    return (
        <div>
            <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <RecipeItem recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
