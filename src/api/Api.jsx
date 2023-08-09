import { useState, useEffect } from "react"
import axios from 'axios'

/**
 * Use this hook to make a GET request on a predefined path:
 * get the data, the loading status and the potential errors.
 * 
 * @param {string} path Path to the resource to retrieve.
 * @returns {{data: Object, isLoaded: boolean, isError: Object}} Returns an object containing the retrieved data, a boolean indicating whether the loading is complete, and any error.
 */
const useFetchData = (path) => {
    const [data, setData] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const [isError, setError] = useState()

    useEffect(() => {
        async function FetchData(path) {
            setLoaded(false)
            try {
                const response = await axios.get(path)
                setData(response.data)
                setError(null)
                setLoaded(true)
            } catch (error) {
                setError(error)
                setLoaded(true)
            }
        }
        FetchData(path)
    }, [path])

    return {data, isLoaded, isError}

}

/**
 * Retrieves employee data from a predefined path.
 * 
 * @returns {{data: Object, isLoaded: boolean, isError: Object}} Returns an object containing the retrieved data, a boolean indicating whether the loading is complete, and any error.
 */
export const GetDataEmployees = () => { 
    return useFetchData("/data/mocked-employees.json") 
}