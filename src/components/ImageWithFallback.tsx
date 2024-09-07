import React from "react"
import { useEffect, useState } from "react"

export const ImageWithFallback = ({ fallback, alt, src, ...props }: any) => {
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
    }, [src])

    return (
        <img
            alt={alt}
            onError={setError}
            src={error ? fallback : src}
            {...props}
        />
    )
}