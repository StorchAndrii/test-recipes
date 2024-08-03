'use client'
import Image from 'next/image'
import { useState } from 'react'

interface CustomImageProps {
    image: string
    maxWidth?: string
    maxHeight?: string
    alt: string
}

function CustomImage({ image, maxWidth, maxHeight, alt }: CustomImageProps): JSX.Element {
    const [loading, setLoading] = useState(true)
    const myLoader = ({ src }: { src: string }): string => {
        return src
    }

    return (
        <Image
            priority
            unoptimized
            alt={alt}
            blurDataURL="/images/img-bg.jpg"
            className={`rounded-xl transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
            height={1000}
            loader={myLoader}
            placeholder="blur"
            src={image}
            style={{
                maxWidth: maxWidth ? maxWidth : '300px',
                maxHeight: maxHeight ? maxHeight : 'auto',
                width: maxWidth ? maxWidth : '',
                height: 'auto',
                objectFit: maxHeight ? 'cover' : 'contain',
            }}
            width={1000}
            onLoad={() => {
                setLoading(false)
            }}
        />
    )
}

export default CustomImage
