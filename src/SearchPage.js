import React from 'react'
import './SearchPage.css'
import { useStateValue } from './StateProvider'
import useGoogleSearch from './useGoogleSearch';
import response from './response';
import img from './img/google.jpg'
import { Link } from 'react-router-dom'
import Search from './Search'
import SearchIcon from '@material-ui/icons/Search'
import DescriptionIcon from '@material-ui/icons/Description'
import ImageIcon from '@material-ui/icons/Image'
import RoomIcon from '@material-ui/icons/Room'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'


export default function SearchPage() {
    const [{ term }, dispatch] = useStateValue();
    // -------LIVE API CALL---------------------
    const {data} = useGoogleSearch(term)
    // const data = response;

    console.log(data)
    return (
        <div className="searchPage">
            <div className="searchPage_Header">
                <Link to="/">
                    <img className="searchPage_logo" src={img} alt="" />
                </Link>

                <div className="searchPage_HeaderBody">
                    <Search hideButtons />
                    <div className="searchPage_options">
                        <div className="searchPage_optionsLeft">
                            <div className="searchPage_option">
                                <SearchIcon />
                                <Link to="/all" >All</Link>
                            </div>
                            <div className="searchPage_option">
                                <DescriptionIcon />
                                <Link to="/news" >news</Link>
                            </div>
                            <div className="searchPage_option">
                                <ImageIcon />
                                <Link to="/image" >image</Link>
                            </div>
                            <div className="searchPage_option">
                                <LocalOfferIcon />
                                <Link to="/shopping" >shopping</Link>
                            </div>
                            <div className="searchPage_option">
                                <RoomIcon />
                                <Link to="/map" >map</Link>
                            </div>
                        </div>

                        <div className="searchPage_optionsRight">
                            <div className="searchPage_option">
                                <Link to="/setting" >setting</Link>
                            </div>
                            <div className="searchPage_option">
                                <Link to="/tools" >tools</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {term && (<div className="searchPage_results">
                {data?.items.map(item => (
                    <div className="searchPage_result">
                        <a className="searchPage_resultLink" href={item.link}>
                            {item.pagemap?.cse_image?.length > 0 && item.pagemap?.
                            cse_image[0]?.src && (
                            <img className="searchPage_resultImage"
                                src={item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src}
                                alt=""
                            />               
                            )}

                            {item.displayLink}
                        </a>

                        <a className="searchPage_resultTitle" href={item.link}>
                            <h2>{item.title}</h2>
                        </a>
                        <p className="searchPage_resultSnippet">
                            {item.snippet}
                        </p>
                    </div>
                ))}
            </div>)}
        </div>
    )
}
