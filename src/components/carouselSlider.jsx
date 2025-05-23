import { useState } from 'react'

function CarouselSlider(props) {

    const duplicar = [0, 1]
    return <>
        <div className={`flex w-[calc(250px*${props.viajes.length * 2})]   gap-10 scroll`}>

            {/* flatMap devuelve un array plano con los valores es por eso que si utilizo map sin mas da error porque trato de devolver un array */}
            {duplicar.flatMap((_, i) =>
                props.viajes.map((element, index) => (
                    <div

                        className="min-w-70 min-h-60 flex items-center hover:scale-150 duration-300 ease-in-out"
                    >
                        <img
                            src={element.imagen[0]}
                            className="w-full h-full hover:[transform:translateZ(100px)] duration-300 ease-in-out"
                        />
                    </div>
                ))
            )}
        </div>    </>


}

export default CarouselSlider


