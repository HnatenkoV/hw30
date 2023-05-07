import React from "react";
import EpisodeList from "./episodeList";
import TablePagination from "@mui/material/TablePagination";
import useFetchHeroes from "../hooks/useFetchHeroes";


const UserHookEpisode = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const {data, loading, error} = useFetchHeroes(
        `episode/?page=${page * rowsPerPage / 20 + 1}`
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (error) {
        return <h1 style={{color: "red"}}> === Error ===</h1>
    }

    return <>
        <>
        {loading ? <p>Loading...</p> : <EpisodeList episodeList={data}
                                                    rowsPerPageOptions={[1]}
                                                    component={"div"}
                                                    count={data?.info?.count}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
        />}
        </>
    </>

}



export default UserHookEpisode;