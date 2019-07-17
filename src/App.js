import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Repo from './components/Repo'
import './App.css'

export default function App() {

    const [repos, setRepos] = useState([])
    const [error, setError] = useState(false)

    /*  Fetch repos from Github API  */
    useEffect(() => {
        setError(false)
        try {
            axios
                // by default the page value here is set to "1", so we don't need to add page parameter
                .get('https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc')
                // store the fetched data into repos []
                .then(result => { setRepos(result.data.items) })
        }
        catch (error) { setError(true) }
        // passing an empty [] to let repos state inside the hook always have the initial value
    }, [])

    return (
        <div>
            <h1 className="text-center display-4">Github Repos</h1>
            <hr style={hr_style} />

            {/*  check if any errors to handel  */}
            { error && <h5 className="text-center">Something went wrong...!!</h5> }

            {
                // mapping through the repos array to display the fetched data
                repos.map(repo => (
                    <Repo
                        // key makes every repo unique and doesn't affect to others
                        key = { repo.id }
                        // passing repo as a prop to use data from repos[] in the Repo component
                        repo = { repo }
                    />
                ))
            }

        </div>
    )

}

const hr_style = {
    width: "20rem",
    marginBottom: "3rem"
}