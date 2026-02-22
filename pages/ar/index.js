import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ArIndex = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace('/ar/home')
    }, [])

    return null
}

export default ArIndex
