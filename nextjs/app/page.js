'use client'
import Expo from '../components/expo/page'
export default function Page() {

    return (
        <div className="flex flex-col gap-2 mb-5">
            <div className='flex flex-col gap-1'>
                <div className='text-xl'>Shop</div>
                <div>coming soon...</div>
            </div>

            <div className='flex flex-col gap-1'>
                <div className='text-xl'>Gallery</div>
                <Expo />
            </div>
        </div>
    )
}