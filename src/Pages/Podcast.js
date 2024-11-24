import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db , auth} from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../Components/Podcasts/PodcastCard";
import MostPopular from "../Components/Podcasts/MostPopular/MostPopular";
import InputComponent from "../Components/common/Input";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


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
          {filteredPodcasts?.slice(0, 4).map((item) => {
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
     <div className="popular-podcast">
      <h1>POPULAR PODCAST</h1>
      {filteredPodcasts.length > 0 ? (
        <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
          {filteredPodcasts?.slice(4).map((item) => {
            return (
             <>
              <MostPopular
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
             </>
              
            );
          })}

        </div>
      ) : (
        <p>No popularData</p>
      )}
   
     </div>
    </div>
  </div>
);
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default PodcastsPage;