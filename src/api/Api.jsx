import { useState, useEffect } from "react"

/**
 * Use this hook to make a GET request on a predefined path:
 * get the data, the loading status and the potential errors.
 * 
 * @param {string} path Path to the resource to retrieve.
 * @returns {{data: Object, isLoaded: boolean, isError: Object}} Returns an object containing the retrieved data, a boolean indicating whether the loading is complete, and any error.
 */
const useFetchData = (path) => {
    const [data, setData] = useState(null)
    const [isLoaded, setLoaded] = useState(false)
    const [isError, setError] = useState(null)

    useEffect(() => {
        async function fetchData(path) {
            setLoaded(false)
            try {
                const response = await fetch(path)
                if (!response.ok) { 
                    throw new Error(`HTTP error, status: ${response.status}`)
                }
                const responseData = await response.json()
                setData(responseData)
                setError(null)
                setLoaded(true)
            } catch (error) {
                setError(error)
                setLoaded(true)
            }
        }
        fetchData(path)
    }, [path])

    return { data, isLoaded, isError }
}

/**
 * Retrieves employee data from a predefined path.
 * 
 * @returns {{data: Object, isLoaded: boolean, isError: Object}} Retourne un objet contenant les données des employés, un booléen indiquant si le chargement est terminé, et une erreur éventuelle.
 */
export const GetDataEmployees = () => { 
    return useFetchData("/data/mocked-employees.json") 
}