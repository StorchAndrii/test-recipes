'use client'
import Image from 'next/image'

interface CustomImageProps {
    image: string
    maxWidth?: string
    maxHeight?: string
    alt: string
}

function CustomImage({ image, maxWidth, maxHeight, alt }: CustomImageProps): JSX.Element {
    const myLoader = ({ src }: { src: string }): string => {
        return src
    }

    return (
        <Image
            priority
            unoptimized
            alt={alt}
            className="overflow-hidden rounded-xl"
            height={1000}
            loader={myLoader}
            src={image}
            style={{
                maxWidth: maxWidth ? maxWidth : '300px',
                maxHeight: maxHeight ? maxHeight : 'auto',
                width: maxWidth ? maxWidth : '',
                height: 'auto',
                objectFit: maxHeight ? 'cover' : 'contain',
            }}
            width={1000}
        />
    )
}

export default CustomImage
