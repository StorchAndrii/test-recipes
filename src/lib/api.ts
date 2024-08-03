import { API_URL, PAGE_SIZE } from '@/constants'
import { type ApiResponse, type Recipe } from '@/types'

export const getRecipe = ({ id }: { id: string }): Promise<Recipe | null> => fetch(`${API_URL}/${id}`).then((res) => res.json()) as Promise<Recipe | null>
export const getTags = (): Promise<string[]> => fetch(`${API_URL}/tags`).then((res) => res.json()) as Promise<string[]>
export const getRecipes = async ({ page, tag }: { page: number; tag?: string | null }): Promise<ApiResponse<Recipe[]>> => {
    const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        skip: String((page - 1) * PAGE_SIZE),
        delay: '1000',
    })
    const data = (await fetch(`${API_URL}${tag ? `/tag/${tag}` : ''}?${params.toString()}`).then((res) => res.json())) as ApiResponse<Recipe[]>
    return data
}
