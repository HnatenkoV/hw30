import useFetchHeroes from "../hooks/useFetchHeroes";
import HeroList from "./heroList";
import React, {useEffect} from "react";
import "../css/style.css"
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCharacterAsync} from "../store/slices/rickAndMorty";
import TableSkeleton from "./tableSkeleton";
import CircularColor from "./circular";
import {Box} from "@mui/material";
import TableBody from "@mui/material/TableBody";


const UserHookHeroes = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    // const {data, loading, error} = useFetchHeroes(
    //     `character/?page=${page * rowsPerPage / 20 + 1}`
    // );

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCharacterAsync(page * rowsPerPage / 20 + 1))
    }, [dispatch, page])

    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const heroes = useSelector((state) => state.rickmorty.listOfChar);
    const isLoading = useSelector((state) => state.rickmorty.isLoading)
    const heroesInfo = useSelector((state) => state.rickmorty.heroesInfo)

    const isFirstLoading = () => !heroes.length && isLoading;
    if (isFirstLoading()) return (
        <Box >
            <CircularColor/>
        </Box>
    )

    return <>
        <Outlet/>
        <div>
            {isLoading ? <TableSkeleton  rowsPerPage={rowsPerPage} /> : <HeroList heroes={heroes}
                                                 rowsPerPageOptions={[1]}
                                                 component={"div"}
                                                 count={heroesInfo?.info?.count}
                                                 rowsPerPage={rowsPerPage}
                                                 page={page}
                                                 onPageChange={handleChangePage}
                                                 onRowsPerPageChange={handleChangeRowsPerPage}/>
        }
        </div>
    </>

}

export default UserHookHeroes
