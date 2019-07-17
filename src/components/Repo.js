import React from 'react'

import '../App.css'

export default function Repo(props) {

    const { repo } = props

    return (
        <div className="container">
            <div className="card m-3">
                <div className="row">
                    <div className="col-md-4 col-xl-3">
                        <img src={ repo.owner.avatar_url } alt="Avatar" className="card-img" />
                    </div>
                    <div className="col-md-8 col-xl-9">
                        <div className="card-body">
                            <h5 className="card-title">{ repo.name }</h5>
                            <p className="card-text">{ repo.description }</p>
                            <div className="cardFooter">
                                <span className="card-text"><small className="text-muted" id="stars_text">Stars: { repo.stargazers_count } <i className="fas fa-star"></i></small></span>
                                <span className="card-text"><small className="text-muted" id="issues_text">Issues: { repo.open_issues_count } <i className="fas fa-exclamation-triangle"></i></small></span>
                                <span className="card-text"><small className="text-muted">Submitted by <b>{ repo.owner.login }</b></small></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}