import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

export default function Repositories() {
    const history = useHistory();
    const [ repositories, setRepositories ] = useState([]);
    
    useEffect(() => {
        let repositoriesName = localStorage.getItem('repositoriesName');
        if (repositoriesName) {
            repositoriesName = JSON.parse(repositoriesName);
            // console.log(repositoriesName);
            setRepositories(repositoriesName);
            localStorage.clear();
        } else {
            history.push("/");
        }
    }, []);

    return (
        <S.Container>
            <S.Title>Repositórios</S.Title>
            <h1 style={{ fontSize: '50px', color: 'red' }}>Hello Style!</h1>
            <S.List>
                { repositories.map( repository => {
                    return (
                        <S.ListItem>{ repository }</S.ListItem>
                    )
                }) }
           </S.List>
            <S.LinkHome to="/">Voltar</S.LinkHome>
        </S.Container>
    )
}