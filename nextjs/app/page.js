'use client'
import Link from 'next/link'
import Expo from '../components/expo/page'
export default function Page() {

    return (
        <div className="flex flex-col gap-5 mb-5">
            <div className='flex flex-col gap-1'>
                <div className='text-xl'>Shop</div>
                <div>coming soon...</div>
            </div>

            <div className='flex flex-col gap-1'>
                <Link href={'/gallery'} className='text-xl'>Gallery</Link>
                <Expo />
            </div>
        </div>
    )
}