import useFetchHeroes from "../hooks/useFetchHeroes";
import HeroList from "./heroList";
import React from "react";
import "../css/style.css"
import {Outlet} from "react-router-dom";


const UserHookHeroes = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const {data, loading, error} = useFetchHeroes(
        `character/?page=${page * rowsPerPage / 20 + 1}`
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
        <Outlet/>
        <div>
        {loading ? <p>Loading...</p> : <HeroList heroList={data}
                                                 rowsPerPageOptions={[1]}
                                                 component={"div"}
                                                 count={data?.info?.count}
                                                 rowsPerPage={rowsPerPage}
                                                 page={page}
                                                 onPageChange={handleChangePage}
                                                 onRowsPerPageChange={handleChangeRowsPerPage}/>
        }
        {/*<Pagination classNameBtn="btn" currentPage = {currentPage}*/}
        {/*            setCurrentPage = {setCurrentPage} */}
        {/*            maxPages={maxPage}/>*/}
        </div>
    </>

}

export default UserHookHeroes
