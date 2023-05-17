import React, {useEffect} from "react";
import EpisodeList from "./episodeList";
import {useDispatch, useSelector} from "react-redux";
import {getEpisodeAsync} from "../store/slices/rickAndMorty";
import {Box} from "@mui/material";
import CircularColor from "./circular";
import TableSkeleton from "./tableSkeleton";


const UserHookEpisode = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    // const {data, loading, error} = useFetchHeroes(
    //     `episode/?page=${page * rowsPerPage / 20 + 1}`
    // );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEpisodeAsync(page * rowsPerPage / 20 + 1))
    }, [dispatch, page])

    const episode = useSelector((state) => state.rickmorty.listOfEpisode);
    const isLoading = useSelector((state) => state.rickmorty.isLoading)
    const episodeInfo = useSelector((state) => state.rickmorty.episodeInfo)

    const isFirstLoading = () => !episode.length && isLoading;
    if (isFirstLoading()) return (
        <Box >
            <CircularColor/>
        </Box>
    )

    return <>
        <>
            {isLoading ? <TableSkeleton rowsPerPage={rowsPerPage} /> : <EpisodeList episode={episode}
                                                    rowsPerPageOptions={[1]}
                                                    component={"div"}
                                                    count={episodeInfo?.info?.count}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
        />}
        </>
    </>

}



export default UserHookEpisode;