import { useState, useEffect } from 'react'

function useClassNameError(error) {

    const [classNameError, setClassNameError] = useState("")


    useEffect(() => {
        if (error) {
            setClassNameError("text-red-500 text-center font-semibold border border-red-500 rounded-lg p-2")
        }
        else {
            setClassNameError("")
        }
    }, [error])

    return classNameError

}

export default useClassNameError