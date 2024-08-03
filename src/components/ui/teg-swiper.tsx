'use client'
import Link from 'next/link'
import { useQueryState } from 'nuqs'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import type SwiperCore from 'swiper'

interface TagSliderProps {
    tags: string[]
}

function TagSlider({ tags }: TagSliderProps): JSX.Element {
    const [currentTag] = useQueryState('tag')
    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null)

    useEffect(() => {
        if (swiperInstance && currentTag) {
            const tagIndex = tags.indexOf(currentTag.charAt(0).toUpperCase() + currentTag.slice(1))
            swiperInstance.slideTo(tagIndex + 1)
        }
    }, [swiperInstance, currentTag, tags])

    return (
        <div className="mt-6">
            <Swiper
                loop
                navigation
                breakpoints={{
                    3440: { slidesPerView: 23 },
                    2560: { slidesPerView: 18 },
                    1920: { slidesPerView: 12 },
                    1024: { slidesPerView: 9 },
                    600: { slidesPerView: 6 },
                    480: { slidesPerView: 4 },
                    375: { slidesPerView: 3 },
                    320: { slidesPerView: 2 },
                }}
                slidesPerView={7}
                spaceBetween={10}
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper)
                }}
            >
                {['All Recipes', ...tags].map((tag) => (
                    <SwiperSlide key={tag}>
                        <Link
                            className={`block text-nowrap rounded border border-gray-300 py-2 text-center ${
                                currentTag === tag.toLowerCase() || (!currentTag && tag === 'All Recipes') ? 'bg-black text-white' : ''
                            }`}
                            href={`/recipes?page=1${tag === 'All Recipes' ? '' : `&tag=${tag.toLowerCase()}`}`}
                        >
                            {tag}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TagSlider
