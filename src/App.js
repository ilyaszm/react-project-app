import React, { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component"

import Repo from './components/Repo'
import './App.css'

export default function App() {

    const [repos, setRepos] = useState([])
    const [error, setError] = useState(false)
    // set page to number "2" to use it in the next fetch
    const [page, setPage] = useState(2)

    /*  Fetch repos from Github API  */
    useEffect(() => {
        setError(false)
        try {
            axios
                // by default the page value is "1"
                .get('https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc')
                // store the fetched data into repos []
                .then(result => { setRepos(result.data.items) })
        }
        catch (error) { setError(true) }
        // passing an empty [] to let repos state inside the hook always have the initial value
    }, [])

    /*  Fetching repos from the next page  */
    const loadMoreRepos = () => {
        setError(false)
        try {
            axios
                .get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`)
                .then( result => {
                    // Adding the new fetched repos to the first ones
                    setRepos(repos.concat(result.data.items))
                    setPage(page + 1)
                })
        }
        catch (error) { setError(true) }
    }

    return (
        <div>
            <h1 className="text-center display-4 pt-5">Github Repos</h1>
            <hr style={hr_style} />

            {/*  check if any errors to handel  */}
            { error && <h5 className="text- mt-5">Something went wrong...!!</h5> }

            {/*  Auto Pagination when scrolling by using InfiniteScroll Component  */}
            <InfiniteScroll
                // define "dataLength" to make the upcoming calls to "next" goes successfully
                dataLength  = { repos.length }
                // the loadMoreRepos() will be called after we reach the bottom
                next        = { loadMoreRepos }
                // "hasMore" tells the InfiniteScroll to call "next" after reaching the bottom
                hasMore     = { true }
                loader      = { <h3 className="text-center mb-5">Loading...</h3> }
            >
                {
                    // mapping through the repos array to display the fetched data
                    repos.map(repo => (
                        <Repo
                            key = { repo.id }
                            // passing repo as a prop to use data from repos[] in the Repo component
                            repo = { repo }
                        />
                    ))
                }
            </InfiniteScroll>

        </div>
    )

}

const hr_style = {
    width: "20rem",
    marginBottom: "3rem"
}