"use client";

import React, { useEffect, useState } from "react";
import tmdbApi, { requests } from "@/components/api";
import styled from "styled-components";
import MainButtons from "@/components/MainButtons";
import {
  renderRoundMovies,
  renderBoxMovies,
  RandomMovie,
} from "../utils/movieFunctions";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

function Home() {
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [horror, setHorror] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data: nowPlayingData } = await tmdbApi.get(
          requests.fetchNowPlaying,
        );
        const { data: topRatedData } = await tmdbApi.get(
          requests.fetchTopRated,
        );
        const { data: popularData } = await tmdbApi.get(requests.fetchPopular);
        const { data: trendingData } = await tmdbApi.get(
          requests.fetchTrending,
        );
        const { data: horrorData } = await tmdbApi.get(
          requests.fetchHorrorMovies,
        );

        setNowPlaying(nowPlayingData.results);
        setTopRated(topRatedData.results);
        setPopular(popularData.results);
        setTrending(trendingData.results);
        setHorror(horrorData.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Container>
      <RandomMovie movies={topRated} />
      <MainButtons />
      <h3 className="pl-[0.25rem] text-white mb-[1.44rem] text-preview font-bold">
        Previews
      </h3>
      <ImageBox className="flex wrap space-x-[0.44rem] w-[100%] justify-start">
        {renderRoundMovies(topRated)}
      </ImageBox>

      <ImageBox className="pl-[0.75rem] w-[100%] flex flex-col">
        <h3 className="pl-[0.25rem] text-white mt-[14px] mb-[1.44rem] text-popular font-bold">
          Continue Watching for Emenalo
        </h3>
        <ImageBox className="flex wrap space-x-[7px] w-[100%] justify-start">
          {renderBoxMovies(nowPlaying)}
        </ImageBox>
      </ImageBox>

      <ImageBox className="pl-[0.75rem] w-[100%] flex flex-col">
        <h3 className="pl-[0.25rem] text-white mt-[14px] mb-[1.44rem] text-popular font-bold">
          Popular on Netflix
        </h3>
        <ImageBox className="flex wrap space-x-[7px] w-[100%] justify-start">
          {renderBoxMovies(popular)}
        </ImageBox>
      </ImageBox>

      <ImageBox className="pl-[0.75rem] w-[100%] flex flex-col">
        <h3 className="pl-[0.25rem] text-white mt-[14px] mb-[1.44rem] text-popular font-bold">
          Tranding Now
        </h3>
        <ImageBox className="flex wrap space-x-[7px] w-[100%] justify-start">
          {renderBoxMovies(trending)}
        </ImageBox>
      </ImageBox>

      <ImageBox className="pl-[0.75rem] w-[100%] flex flex-col">
        <h3 className="pl-[0.25rem] text-white mt-[14px] mb-[1.44rem] text-popular font-bold">
          Horror Movies
        </h3>
        <ImageBox className="flex wrap space-x-[7px] w-[100%] justify-start">
          {renderBoxMovies(horror)}
        </ImageBox>
      </ImageBox>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 60px;
`;

const ImageBox = styled.div`
  overflow: auto;
  list-style-type: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
