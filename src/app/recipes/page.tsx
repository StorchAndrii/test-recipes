import NotFound from 'next/dist/client/components/not-found-error'
import { Suspense } from 'react'

import GroupRecipes from '@/components/group-recipes'
import Pagination from '@/components/ui/pagination'
import TagSlider from '@/components/ui/teg-swiper'
import { getRecipes, getTags } from '@/lib/api'
import { searchParamsCache } from '@/lib/search-params'
import { type ApiResponse, type Recipe } from '@/types'

async function responsePage(page: number, tag: string): Promise<{ tags: string[]; recipesData: ApiResponse<Recipe[]> } | null> {
    try {
        const [responseTags, responseRecipe] = await Promise.all([getTags(), getRecipes({ page, tag })])
        return { tags: responseTags, recipesData: responseRecipe }
    } catch (error) {
        return null
    }
}

interface RecipesPageProps {
    searchParams: Record<string, string | string[] | undefined>
}

export default async function RecipesPage({ searchParams }: RecipesPageProps): Promise<JSX.Element> {
    searchParamsCache.parse(searchParams)

    const page = searchParamsCache.get('page') || 1
    const tag = searchParamsCache.get('tag') || ''
    const data = await responsePage(page, tag)

    if (!data) {
        return <NotFound />
    }

    const { tags, recipesData } = data
    return (
        <main className="p-6 text-center">
            <h1 className="text-5xl font-bold">Increasio Recipes</h1>
            <p className="mt-4 text-xl opacity-80">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, ut?</p>
            <TagSlider tags={tags} />
            <Suspense fallback={<div>Loading...</div>}>
                <GroupRecipes recipes={recipesData.recipes} />
            </Suspense>
            {recipesData.total > 9 && <Pagination currentPage={page} tag={tag} total={recipesData.total} />}
        </main>
    )
}
