import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  html * {
    box-sizing: border-box;
  }

  body {
    padding: 10px 20px;
  }

  ul, li {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style-type: none;
  }
`;

const Main = styled.main`
  max-width: 700px;
  margin: auto;
`;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  );
};

export default App;
