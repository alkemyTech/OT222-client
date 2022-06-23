import React from "react"
import { TailSpin } from "react-loader-spinner"

export default function LoaderSpinner() {
    return (
        <>
            <TailSpin
                ariaLabel="loading"
                color="#DB5752"
            />
        </>
    )
}