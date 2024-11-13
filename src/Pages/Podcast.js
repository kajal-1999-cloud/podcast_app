import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db , auth} from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../Components/Podcasts/PodcastCard";
import MostPopular from "../Components/Podcasts/MostPopular/MostPopular";
import InputComponent from "../Components/common/Input";

function PodcastsPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcast.podcasts); 
  const user = useSelector(state => state.user.user)
  const [search, setSearch] = useState("");
  const [popularData, setPopularData] = useState([])
  const [playingFile, setPlayingFile] = useState("");


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
        console.log("podd",podcasts)
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "episodes")),
      (querySnapshot) => {
        const mostPopularData = [];
        querySnapshot.forEach((doc) => {
          mostPopularData.push({ id: doc.id, ...doc.data() });
        });
        setPopularData(mostPopularData);
        console.log("populr",popularData)
      },
      (error) => {
        console.error("Error fetching popularData:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("populr",popularData)
  

  var filteredPodcasts = podcasts.filter(
    (item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );


  return (
    <div className="podcast">
    <Header />
    <div className="podcast-wrapper" style={{ marginTop: "2rem" }}>
      <h1>Discover Podcasts</h1>
      <InputComponent
        state={search}
        setState={setSearch}
        placeholder="Search By Title"
        type="text"
      />

     <div className="cards container">
    <div  className="podcastCards">
    {filteredPodcasts.length > 0 ? (
        <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
          {filteredPodcasts?.map((item) => {
            return (
             <>
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
                // username={ == auth.currentUser.uid && user.name}
              />
    
             </>
              
            );
          })}

        </div>
      ) : (
        <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
      )}
       
    </div>
     </div>
     {/* <div>
      <h1>POPULAR PODCAST</h1>
     {popularData.length > 0 ? (
              <>
                {popularData.map((episode, index) => {
                  return (
                    <MostPopular
                      key={index}
                      index={index + 1}
                      title={episode.title.toUpperCase()}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No popularData</p>
            )}
     </div> */}
    </div>
  </div>
);
}

export default PodcastsPage;