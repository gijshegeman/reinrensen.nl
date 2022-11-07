import Image from 'next/image'

export default function RoundupPage({
    resetForm,
    aanvraag,
    setAanvraagForm,
    setRoundupPage,
    createObjectURL,
    pevieuwImgDimensions
}) {
    return (<>
        <div className="md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]">

            <div className="flex flex-col items-center gap-5 text-sm text-center">
                <div
                    className={pevieuwImgDimensions.height > pevieuwImgDimensions.width
                        ? "flex w-5/6 max-w-xl"
                        : "flex max-w-7xl"
                    }
                >
                    <Image
                        src={createObjectURL}
                        alt="example IMG"
                        height={pevieuwImgDimensions.height}
                        width={pevieuwImgDimensions.width}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <div className="font-bold">{aanvraag.voornaam}, bedankt voor uw aanvraag!</div>
                    <div>Check of u de bevestigingsmail heeft ontvangen!</div>
                    <div className=''>De gemiddelde levertijd is 2 - 3 weken.</div>
                    <div className='text-center'>Ik neem zo snel mogelijk via de mail contact met u op!</div>
                </div>

                <div className="flex flex-col gap-5 items-center text-sm text-[#21564e]">
                    <div className="hover:text-[#92aba6] hover:scale-[102%] transform-gpu animate ease-out duration-300 active:scale-100"
                        onClick={() => {
                            resetForm()
                            setRoundupPage(false)
                            setAanvraagForm(true)
                        }}
                    >
                        Nog een aanvraag doen &rarr;
                    </div>


                </div>
            </div>

        </div>

    </>)
}