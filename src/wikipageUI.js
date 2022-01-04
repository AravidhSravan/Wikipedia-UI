import React, { useState } from 'react';
import './App.css'
function Wiki() {
    const [searchterm, setSearchTerm] = useState('');
    const [sugestion, setSugestion] = useState([]);
    const [searchResult, setSearchResult] = useState({});
    let submit = async () => {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`
        const response = await fetch(endpoint);
        const json = await response.json();
        console.log(json)
        setSugestion(json.query.searchterm);
        setSearchResult(json.query.searchResult);
        console.log(searchterm);
    }
    return (
        <div>
            <div>
                <input type="text" placeholder='Search...' value={searchterm} onChange={e => setSearchTerm(e.target.value)} />&nbsp;
                <button style={{ width: "110px", height: "25px" }} onClick={() => submit()}>Search</button>
            </div>
            <div>
                {sugestion.map((sugestion, i) => {
                    const url = `https://en.wikipedia.org/?curid=${sugestion.pageid}`;
                    return (
                        <div key={i} className={i % 2 === 0 ? 'container1' : 'container2'}>
                            <h3>{sugestion.title}</h3>
                            <p dangerouslySetInnerHTML={{ __html: sugestion.snippet }}></p>
                            <a href={url} target="_blank" rel="nofollow" style={{ textDecoration: "none" }}>Read More</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Wiki