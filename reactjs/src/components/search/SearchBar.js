import React from 'react'

function SearchBar({ keyword, setKeyword }) {

    return (
        <>
            <div className="search">
                <div className="search-wrapper">
                    <div className="location-wrapper">
                        <img className="location" src="./assets/images/location.png" alt="" />
                        <div className="Right">
                            <select className="selectOne" name="" id="">
                                <option value="0"> IIT BHU</option>
                            </select>
                        </div>
                    </div>
                    <div className="word-wrapper">
                        <div className="search-icon">
                            <img className="search-png" src="./assets/images/search.png" alt="" />
                        </div>
                        <input
                            className="barStyle"
                            key="osme1"
                            value={keyword}
                            placeholder="Search country"
                            onChange={e => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar
