const ora = require("ora");
const path = require("path");
const chalk = require("chalk");
const color = require("color");
const spawn = require("cross-spawn");
const simpleGit = require("simple-git/promise");

const workPath = path.resolve(__dirname, "../");
const git = simpleGit(workPath);



(async function () {
  const spinner = ora("正在将js转换成es5").start();
  spawn.sync("babel", [
    path.resolve(__dirname, "../src/"),
    "--out-dir",
    path.resolve(__dirname, "../dist/")
  ]);
  spinner.text = "转换成功!";
  spinner.text = "正在进行git操作";
  try {
    console.log("工作区状态=>", await git.status());
    await git.init();
    await git.add("*");
    await git.commit("发布版本,并上传到gitee");
  } catch (error) {

  };
})();



