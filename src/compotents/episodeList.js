import React from "react";
import "../css/css-material-ui/material-ui.css"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {Box} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TablePagination from "@mui/material/TablePagination";


const EpisodeList = (props) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (
        <>
            <Box sx={{ width: 1050, margin: 'auto' }}>
                <TableContainer sx={{ }} component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.episodeList.results.map((location, index) =>
                                <StyledTableRow key={`location-card-${index}`}>
                                    <StyledTableCell align="center">{location.id}</StyledTableCell>
                                    <StyledTableCell align="center">{location.name}</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination sx={{ }}
                                 rowsPerPageOptions={[1]}
                                 component={"div"}
                                 count={props.count}
                                 rowsPerPage={props.rowsPerPage}
                                 page={props.page}
                                 onPageChange={props.onPageChange}
                                 onRowsPerPageChange={props.onRowsPerPageChange}
                />
            </Box>
        </>
    )
}


export default EpisodeList


// import HeroCard from "./heroCard";
// import EpisodeCard from "./episodeCard";
//
//
//
// const HeroList = (props) => {
//
//     return (
//         <div className= "hero-list">
//             <div>
//             {props.heroList?.results ? props.heroList.results.map((hero, index) => (
//                 <HeroCard hero={hero} index={index} key={`hero-card-${index}`}>{hero.name}</HeroCard>)) :
//                 props.EpisodeList?.results && props.EpisodeList.results.map((location, index) => (
//                 <EpisodeCard location={location} key={`location-card-${index}`}>{location.name}</EpisodeCard>))
//             }
//             </div>
//         </div>
//
//
//     )
// }
//
//
// export default HeroList