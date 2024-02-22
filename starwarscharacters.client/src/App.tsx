import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type Character = {
    name: string;
    birthYear: string;
    homePlanet: string | undefined;
    homeworldUrl: string; 
    films: string[];
    numberOfFilms: number;
}

interface CharactersResponse {
    characters: Character[];
}

interface PlanetResponse {
    name: string;
}

const baseUrl = "https://localhost:7179/";

const StarWarsCharacterList = () => {
    const [characters, setCharacters] = useState<Character[]>();

    const extractId = (url: string): string | null => {
        const match = url.match(/\/(\d+)\/$/);
        return match ? match[1] : null;
    };

    const fetchPlanet = async (planetUrl: string) => {
        const id = extractId(planetUrl);
        if (id === null) return;
        try {
            const response = await axios.get<PlanetResponse>(`${baseUrl}StarWars/GetPlanetById/${id}`);
            return response.data.name
        } catch (error) {
            console.error('Error fetching planet:', error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get<CharactersResponse>(`${baseUrl}StarWars/GetCharacters`);
            const data = response.data;

            await Promise.all(data.characters.map(async (c) => {
                c.numberOfFilms = c.films.length;
                if (!c.homeworldUrl) return;

                const planetName = await fetchPlanet(c.homeworldUrl);
                c.homePlanet = planetName;
            }));

            setCharacters(data.characters);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 id="tabelLabel">Star Wars Characters</h1>
            <p>The best place to geek out!</p>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Year</th>
                        <th>Home Planet</th>
                        <th>Number Of Films</th>
                    </tr>
                </thead>
                <tbody>
                    {characters?.map(c =>
                        <tr key={c.name}>
                            <td>{c.name}</td>
                            <td>{c.birthYear}</td>
                            <td>{c.homePlanet}</td>
                            <td>{c.numberOfFilms}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default StarWarsCharacterList;
