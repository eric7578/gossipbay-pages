import React from 'react';
import styled from 'styled-components';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const Trendings = props => {
  return null;
};

export async function getStaticProps({ params: { timestamp } }) {
  const json = await readFile(
    path.join(process.cwd(), '.gh-artifacts', `${timestamp}.json`),
    { encoding: 'utf-8' }
  );

  return {
    props: JSON.parse(json),
  };
}

export async function getStaticPaths() {
  const jsonFiles = await readdir(path.join(process.cwd(), '.gh-artifacts'));
  const paths = jsonFiles.map(jsonFile => ({
    params: {
      timestamp: path.basename(jsonFile, '.json'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Trendings;
