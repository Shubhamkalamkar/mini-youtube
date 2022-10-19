import { useEffect, useState } from 'react';
import './App.css';
import { Search } from './components/Search';
import { Videos } from './components/Videos';
import { API } from './Api';

function App() {

  const [apiData, setApiData] = useState();
  const [text, setText] = useState();
  const [maxResults, setMaxResults] = useState("25");
  const [err, setErr] = useState(false);

  const getData = (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    
    if(text===undefined || text===null){setErr(true)}
    else{
      setErr(false)
      console.log("api hit")
      const ytData = fetch("https://www.googleapis.com/youtube/v3/search?key=" +API+"&type=video&part=snippet&maxResults="+maxResults+"&q="+ text);
    ytData.then((d) => {
      return d.json()
    }).then((val) => {
      setApiData(val);
    })}
    
  }
  useEffect(() => {
    getData();

  }, [])


  return (
    <div className="App">
      <form onSubmit={getData} className="form" >
        <h1>Mini Youtube</h1>
        <input type="text"
          onChange={(e) => setText(e.target.value)} value={text} required />
        <button type="submit"> Search </button>
      </form>
      <br/>

      {/* <Search func={getData} type={text} /> */}
      {/* <Videos values={apiData} /> */}

      <div >
        {err && <h1 className='err'>Search Any Youtube Videos</h1>}
        <div >
          <div className='videos'>
            {apiData?.items?.map((item) => {
              return (
                <div key={item?.id.videoId}>
                  <iframe width="400px" height="300px" key={item?.id.videoId} src={`https://www.youtube.com/embed/${item.id.videoId}`} title="Abki Baarish Mein - Paras A, Sanchi R| Raj Barman, Sakshi H, Amjad Nadeem Aamir| Zee Music Originals" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
