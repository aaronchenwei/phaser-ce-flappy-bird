import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Main from './game/Main';

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends React.Component<any, any> {
  public game: Main;

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.game = new Main();
  }

  public render() {
    return (
      <GameContainer id="game">
        <Helmet>
          <title>Flappy Bird</title>
        </Helmet>
      </GameContainer>
    );
  }
}

export default App;
