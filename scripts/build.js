const ora = require("ora");
const path = require("path");
const chalk = require("chalk");
const { red, green } = require("colors");
const moment = require("moment");
const spawn = require("cross-spawn");
const simpleGit = require("simple-git/promise");

const workPath = path.resolve(__dirname, "../");
const git = simpleGit(workPath);



(async function () {
  const spinner = ora({
    spinner: "arrow"
  });
  try {
    spinner.start("正在将js转换成es5");
    spawn.sync("babel", [
      path.resolve(__dirname, "../src/"),
      "--out-dir",
      path.resolve(__dirname, "../dist/")
    ]);
    spinner.succeed(green("转换成功!"));
  } catch (error) {
    spinner.fail(red("转换失败!"));
    throw error;
  } finally {
    spinner.stop();
  };

  try {
    spinner.start("正在进行git提交操作");
    await git.status();
    await git.init();
    await git.add("*");
    await git.commit(`${moment().format("YYYY年MM月DD日HH点mm分ss秒")}版本提交`);
    spinner.succeed(green("所有文件提交成功!"));
  } catch (error) {
    spinner.fail(red("文件提交失败!"));
    throw error;
  } finally {
    spinner.stop();
  };
})();



