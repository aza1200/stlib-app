import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-web-swiper";
import { useInfiniteQuery,useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import HList from "../components/HList";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import Slide from "../components/Slide";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;


const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing ] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData,
  } = useQuery(["nowPlaying","movies"],moviesApi.nowPlaying);
  const { 
    isLoading: upcomingLoading, 
    data: upcomingData,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(["upcoming","movies"], moviesApi.upcoming,{
      getNextPageParam:(currentPage)=>{
        const nextPage = currentPage.page +1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  const { isLoading: trendingLoading, data: trendingData
  } = useQuery(["trending","movies"], moviesApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading; 

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };


  return loading ? (
    <Loader/>
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            loop={true}
            timeout={3.5}
            controlsEnabled={false}
            innerContainerStyle	={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ):null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({item})=>(
        <HMedia
          posterPath = {item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
    />
  ) : null;
};

export default Movies;


/*{
"pageParams": [undefined],
"pages": [
  {"dates": [Object], "page": 1, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 2, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 3, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 4, "results": [Array], "total_pages": 18, "total_results": 348}
  ]
}*/