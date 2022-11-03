export default function Background({
    children,
    imgPrevieuwActive,
    setImgPrevieuwActive,
}) {
    return (<>
        <div
            onClick={() => setImgPrevieuwActive(false)}
            className={imgPrevieuwActive
                ? "mx-auto fixed inset-0 flex items-center h-screen w-full bg-neutral-900/[90%]"
                : "hidden"
            }
        >
            {children}
        </div>
    </>)
}
