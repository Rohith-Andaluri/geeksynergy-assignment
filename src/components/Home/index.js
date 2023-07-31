import React from 'react'
import { useState, useEffect } from 'react'
import { BiSolidUpArrow} from 'react-icons/bi'
import { BiSolidDownArrow} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

import Loader from 'react-spinner-loader'
import CompanyInfo from '../ComanyInfo'


const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}
  

const Home = () => {
    const [showCompanyInfo, setShowCompanyInfo] = useState(false)
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        data: null,
        errorMsg: null,
    })
    
    useEffect(() => {
    const getMoviesData = async () => {
        setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
        })

        const data = {
            category: "movies",
            language: "Kannada",
            genre: "all",
            sort: "voting"
        };
          
        const url = 'https://hoblist.com/api/movieList'
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        const responseData = await response.json()
        console.log(responseData)
        if (response.ok) {
        setApiResponse(prevApiDetails => ({
            ...prevApiDetails,
            status: apiStatusConstants.success,
            data: responseData,
        }))
        } else {
        setApiResponse(prevApiDetails => ({
            ...prevApiDetails,
            status: apiStatusConstants.failure,
            errorMsg: responseData.error_msg,
        }))
        }
    }

    getMoviesData()
    }, [])
  
    const renderFailureView = () => {
    const {errorMsg} = apiResponse
    return <p>{errorMsg}</p>
    }

    const renderSuccessView = () => {
        const {data} = apiResponse
        console.log(data)
        return (
            <div className='movie-details-container'>
                 {showCompanyInfo && <CompanyInfo />}
                 <ul className='movie-details-list-container'>
                    {data.result.map(eachItem => (
                        <li className='movie-item-list-container' key={eachItem._id}>
                            <div className='movie-poster-container'>
                                <div className='voting-container'>
                                    <BiSolidUpArrow className='uparrow'/>
                                    <p className='votes-count'>{eachItem.voted.length}</p>
                                    <BiSolidDownArrow className='downarrow' />
                                    <p className='votes'>Votes</p>
                                </div>
                                <img src={eachItem.poster} className='movie-poster' alt={eachItem.title} />
                            </div>
                            <div className='movie-detail-container'>
                                <h5 className='title'>{eachItem.title}</h5>
                                <p className='category'>Genre: <span className='category-desc'>{eachItem.genre}</span></p>
                                <p className='category'>Director: <span className='category-desc'>{eachItem.director}</span></p>
                                <p className='category'>Starring: <span className='category-desc'>{eachItem.stars}</span></p>
                                <p className='movie-details'>{eachItem.runTime === null ? "Unknown" : eachItem.runTime} | {eachItem.language} | {eachItem.releasedDate} </p>
                                <p className='views-votes'>{eachItem.pageViews} | Voted by {eachItem.totalVoted} People</p>
                            </div>
                            <button className='button' type='button'>Watch Trailer</button>
                        </li>
                    ))}
                </ul> 
            </div>
        )
    }

    const renderLoadingView = () => (
        <div>
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
    )

    const renderModal = () => {
        setShowCompanyInfo(prevState => !prevState)
    }

    const renderMovies = () => {
        const {status} = apiResponse
        switch (status) {
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.failure:
                return renderFailureView()
            default:
                return null
        }
    }
    
    return (
        <div className='home-main-container'>
            <Header renderModal={renderModal}/>
            {renderMovies()}
        </div>
    )
}

export default Home