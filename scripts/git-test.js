const path = require("path");
const simpleGit = require("simple-git/promise");

const workPath = path.resolve(__dirname, "../");
const git = simpleGit(workPath);

(async function () {
  console.log(await git.init());
  console.log(await git.add("*"));
  console.log(await git.commit("发布版本,并上传到gitee"));
  console.log(await git.status());
})();
