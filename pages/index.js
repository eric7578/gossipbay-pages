import React from 'react';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Board from '../components/Board';
import useSortedBoards from '../components/useSortedBoards';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const Index = ({ boards }) => {
  const sorted = useSortedBoards(boards);
  return sorted.map(boardData => (
    <Board key={boardData.board} {...boardData} />
  ));
};

export async function getStaticProps() {
  const jsonFiles = await readdir(path.join(process.cwd(), '.gh-artifacts'));
  const [first] = jsonFiles
    .map(jsonFile => parseInt(path.basename(jsonFile, 'json')))
    .sort((d1, d2) => d2 - d1);
  const json = await readFile(
    path.join(process.cwd(), '.gh-artifacts', `${first}.json`),
    { encoding: 'utf-8' }
  );

  return {
    props: {
      boards: JSON.parse(json),
    },
  };
}

export default Index;
