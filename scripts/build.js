const ora = require("ora");
const path = require("path");
const chalk = require("chalk");
const color = require("color");
const spawn = require("cross-spawn");
const simpleGit = require("simple-git/promise");

const workPath = path.resolve(__dirname, "../");
const git = simpleGit(workPath);



(async function () {
  const spinner = ora().start();
  try {
    spinner.text = "正在将js转换成es5"
    spawn.sync("babel", [
      path.resolve(__dirname, "../src/"),
      "--out-dir",
      path.resolve(__dirname, "../dist/")
    ]);
    spinner.text = "转换成功!";
  } catch (error) {
    spinner.text = "转换失败!";
    throw error;
  } finally {
    spinner.stop();
  };

  try {
    spinner.text = "正在进行git提交操作";
    await git.status();
    await git.init();
    await git.add("*");
    await git.commit("发布版本,并上传到gitee");
    spinner.text = "所有文件提交成功!";
  } catch (error) {
    spinner.text = "文件提交失败!";
    throw error;
  } finally {
    spinner.stop();
  };
})();



