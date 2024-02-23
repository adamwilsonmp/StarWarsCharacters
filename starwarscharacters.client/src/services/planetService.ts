import axios from 'axios';
import { baseUrl } from '../constants/constants';
import { extractId } from '../utils/extractIdFromUrl';

interface PlanetResponse {
    name: string;
}

const fetchPlanet = async (planetUrl: string): Promise<string | undefined> => {

    const id = extractId(planetUrl);

    if (id === null) return;

    try {
        const response = await axios.get<PlanetResponse>(`${baseUrl}StarWars/GetPlanetById/${id}`);
        return response.data.name
    } catch (error) {
        console.error('Error fetching planet:', error);
        return;
    }
}

export default fetchPlanet;