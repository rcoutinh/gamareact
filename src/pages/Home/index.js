import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App(props) {
    const history = useHistory();
    const [ usuario, setUsuario ] = useState('');
    const [ error, setError ] = useState(false);

    function handlePesquisa() {
        axios.get(`https://api.github.com/users/${usuario}/repos`)
        .then(response => {
            const repositories = response.data;
            // console.log(JSON.stringify(repositories));
            const repositoriesName = [];
            repositories.map((repository) => {
                return repositoriesName.push(repository.name);
            })
            // console.log(repositoriesName);
            localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
            setError(false);
            history.push('/repositories');
        })
        .catch(err => {
            setError(true);
        });

    }

    return (
        <S.HomeContent>
            <S.Content>
                <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
                <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
            </S.Content>
            { error ? <S.ErrorMsg>Ocorreu um erro. Tente novamente. </S.ErrorMsg> : ''}
        </S.HomeContent>
    );
}

export default App;
