import Expo from '../../components/expo/page'

export const metadata = {
    title: 'Rein Rensen - Gallery',
    description: 'Galery of existing artworks of Rein Rensen.',
    icons: {
        icon: "/favicon.ico",
    },
}

export default function Gallary() {
    return (
        <div className="flex flex-col gap-2">
            <div className='text-xl md:text-2xl'>Gallery</div>
            <Expo />
        </div>
    )
}