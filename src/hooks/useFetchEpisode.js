import {useEffect, useState} from "react";
import axios from "axios";

const useFetchEpisode = (page) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [maxPage, setMaxPage] = useState('')


    useEffect(() => {
        axios.get(page).then(resp => {
            setError(resp.data.error);
            setData(resp.data);
            setLoading(false);
            setMaxPage(resp.data.info?.pages)
        });


    }, [page])




    return {data, loading, error,maxPage}
}
export default useFetchEpisode;