import { useState } from 'react';
import { Character } from '../../services/characterService';
import './StarWarsCharacterTable.css';

export type CharacterTableProps = {
    heading: string;
    subHeading: string;
    characters: Character[];
}

export const StarWarsCharacterTable = (props: CharacterTableProps) => {

    const [search, setSearch] = useState('');

    const filteredCharacters = props.characters.filter(character => character.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="pageContainer">
            <div className="searchContainer">
                <h1 id="tabelLabel">{props.heading}</h1>
                <p>{props.subHeading}</p>
                <input type="text" className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search here" />
            </div>

            <div className="tableContainer">
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
                        {filteredCharacters?.map(c =>
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
           
        </div>
    );
}

export default StarWarsCharacterTable;
