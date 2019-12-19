const ora = require("ora");
const path = require("path");
const chalk = require("chalk");
const color = require("color");
const spawn = require("cross-spawn");
const simpleGit = require("simple-git/promise");

const workPath = path.resolve(__dirname, "../");
const git = simpleGit(workPath);



(async function () {
  const spinner = ora("正在将js转换成es5");
  try {
    spinner.start("正在将js转换成es5");
    spawn.sync("babel", [
      path.resolve(__dirname, "../src/"),
      "--out-dir",
      path.resolve(__dirname, "../dist/")
    ]);
    spinner.succeed("转换成功!");
  } catch (error) {
    spinner.fail("转换失败!");
    throw error;
  } finally {
    spinner.stop();
  };

  try {
    spinner.start("正在进行git提交操作");
    await git.status();
    await git.init();
    await git.add("*");
    await git.commit("发布版本,并上传到gitee");
    spinner.succeed("所有文件提交成功!");
  } catch (error) {
    spinner.fail("文件提交失败!");
    throw error;
  } finally {
    spinner.stop();
  };
})();



