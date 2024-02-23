import axios from 'axios';
import fetchPlanet from './planetService';
import { baseUrl } from '../constants/constants';

interface CharactersResponse {
    characters: Character[];
}

export type Character = {
    name: string;
    birthYear: string;
    homePlanet: string | undefined;
    homeworldUrl: string;
    films: string[];
    numberOfFilms: number;
}

export const fetchCharacterData = async (): Promise<Character[]> => {

    try {
        const response = await axios.get<CharactersResponse>(`${baseUrl}StarWars/GetCharacters`);
        const data = response.data;

        await Promise.all(data.characters.map(async (c) => {
            c.numberOfFilms = c.films.length;
            if (!c.homeworldUrl) return;

            c.homePlanet = await fetchPlanet(c.homeworldUrl);             
        }));

        return data.characters;

    } catch (error) {
        
        console.error('Error fetching data:', error);
        return [];
    }
}