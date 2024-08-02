import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
    tag: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
})
