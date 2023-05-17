import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCharacterAsync = createAsyncThunk(
    "rickmorty/fetchCharacters",
    async (page) => {
        const res = await axios(`character/?page=${page}`);
        const data = await res.data;
        await new Promise(r => setTimeout(r, 1000));
        return data;
    }
);

export const getEpisodeAsync = createAsyncThunk(
    "rickmorty/fetchEpisode",
    async (page) => {
        const res = await axios(`episode/?page=${page}`);
        const data = await res.data;
        return data;
    }
);

export const rickAndMortySlice = createSlice({
    name: 'rickmorty',
    initialState: {
        isLoading: false,
        error: null,
        heroesInfo: null,
        episodeInfo: null,
        listOfChar: [],
        listOfEpisode: [],
        selectedChar: { name: "none" },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCharacterAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCharacterAsync.fulfilled, (state, action) => {
            state.isLoading = false
            state.listOfChar = action.payload.results
            state.heroesInfo = action.payload
        })
        builder.addCase(getCharacterAsync.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        builder.addCase(getEpisodeAsync.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getEpisodeAsync.fulfilled, (state, action) => {
            state.isLoading = false
            state.listOfEpisode = action.payload.results
            state.episodeInfo = action.payload
        })
        builder.addCase(getEpisodeAsync.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },

})

export default rickAndMortySlice.reducer

// export const rickAndMortySlice = createSlice({
//     name: "rickmorty",
//     initialState: {
//         isLoading: false,
//         error: null,
//         heroesInfo: null,
//         listOfChar: [],
//         listOfEpisode: [],
//         selectedChar: { name: "none" },
//     },
//     reducers: {
//         // getCharacter: (state, action) => {
//         //     console.log(state, action);
//         //     state.listOfChar = action.payload
//         // },
//         getEpisode: (state, action) => {
//             console.log(state, action);
//             state.listOfEpisode = action.payload
//         },
//         selectChar: (state, action) => {
//             console.log(state, action);
//             state.selectedChar = action.payload;
//         },
//         clearCharacterList: (state) => {
//             state.listOfChar = []
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getCharacterAsync.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(getCharacterAsync.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.listOfChar = action.payload;
//             state.heroesInfo = action.payload.info
//         });
//         builder.addCase(getCharacterAsync.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.error.message;
//         });
//     },
// });
//
// export const { clearCharacterList, selectChar, getEpisode} = rickAndMortySlice.actions;
//
//
//
// // export const getCharacterAsync = (page) => (dispatch) => {
// //     fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
// //         .then((resp) => resp.json())
// //         .then((data) => dispatch(getCharacter(data.results)))
// // }
//
// export const getEpisodeAsync = (page) => (dispatch) => {
//     fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
//         .then((resp) => resp.json())
//         .then((data) => dispatch(getEpisode(data.results)))
// }
//
// export const getCharacterByIdAsync = (id) => (dispatch) => {
//     fetch(`https://rickandmortyapi.com/api/character/${id}`)
//         .then((response) => response.json())
//         .then((data) => dispatch(selectChar(data)));
// };
//
// export const selectCharList = (state) => state.rickAndMorty.listOfChar
//
// export default rickAndMortySlice.reducer;