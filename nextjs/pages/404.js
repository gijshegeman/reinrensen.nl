export default function error404() {
    return (<>
        <div className="flex flex-col gap-10 items-center">

            <div className="font-thin text-2xl">HTTP 404 | Page not found.</div>

            <div className="flex flex-col gap-2 items-center">
                <div>Hey, de pagina:  die u probeert te bezoeken bestaat niet!</div>
                <div className="">terug</div>
            </div>

        </div>
    </>)
}