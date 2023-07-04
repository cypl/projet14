import { useState, useEffect } from "react"
import axios from 'axios'


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


export const GetDataEmployees = () => { return useFetchData("/data/mocked-employees.json") }