import Link from "next/link";

const links = [
    {
        title: 'home',
        href: '/'
    },
    {
        title: 'bio',
        href: '/bio'
    }
]

export default function Nav() {

    return (
        <div className="flex justify-between items-end gap-2 mb-5">
            <div className="flex flex-col">
                <Link href={'/'} className='text-[24px] font-[300]'>Rein Rensen</Link>
                <div className="tracking-widest font-thin text-xs">Artworks</div>
            </div>

            <div className="flex gap-2 items-baseline text-xs font-thin uppercase tracking-widest">
                {links.map((link, i) => (<Link key={i} href={link.href}>{link.title}</Link>))}
            </div>
        </div>
    )
}