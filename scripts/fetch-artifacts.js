const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const JSZip = require('jszip');

const artifactsDir = path.join(__dirname, '../.gh-artifacts');
const asyncWriteFile = promisify(fs.writeFile);

const params = {
  owner: process.env.GITHUB_ACTOR,
  repo: process.env.GBA_REPO,
};

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});

const downloadArtifactAsJSON = async artifact => {
  const { data } = await octokit.actions.downloadArtifact({
    ...params,
    artifact_id: artifact.id,
    archive_format: 'zip',
  });
  const zip = new JSZip();
  await zip.loadAsync(data);
  const json = await zip.file(artifact.name).async('string');
  await asyncWriteFile(path.join(artifactsDir, artifact.name), json);
};

(async () => {
  fs.rmdirSync(artifactsDir, { recursive: true });
  fs.mkdirSync(artifactsDir, { recursive: true });
  const {
    data: { artifacts },
  } = await octokit.actions.listArtifactsForRepo(params);

  await Promise.all(
    artifacts.map(artifact => downloadArtifactAsJSON(artifact))
  );
})();
