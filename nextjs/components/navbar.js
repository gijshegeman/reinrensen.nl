import Link from 'next/link'

function Navbar() {
    return(
        <div>
            <Link href="/" scroll={false}>
                <a>
                    <div className="logo">
                        <h1 className="title">Gijs Hegeman</h1>
                        <p className="subTitle">Student / Photographer</p>
                    </div>
                </a>
            </Link>

            <div className="navbar">
                <p>
                    <Link href="/" scroll={false}>
                        <a>Home</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default Navbar