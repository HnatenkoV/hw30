import {useEffect, useState} from "react";
import axios from "axios";

const useFetchHeroes = (page) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [maxPage, setMaxPage] = useState('')


    useEffect(() => {
            axios
                .get(page)
                .then((response) => {
                        setData(response.data);
                        console.log(response.data)
                        setError(response.data.error);
                        setLoading(false);
                        setMaxPage(response.data.info?.pages)

                });


    }, [page])




    return {data, loading, error,maxPage}
}
export default useFetchHeroes;