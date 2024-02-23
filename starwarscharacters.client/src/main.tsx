import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'

import StarWarsCharacterTable from './components/characterTable/StarWarsCharacterTable.tsx';
import { fetchCharacterData } from './services/characterService.ts';

const data = await fetchCharacterData();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <StarWarsCharacterTable heading="Star Wars Characters" subHeading="'Masterful, your Star Wars character knowledge is. Impressed, visitors will be.' - Yoda" characters={data} />
  </React.StrictMode>,
)
