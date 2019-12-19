const ora = require("ora");
const path = require("path");
const moment = require("moment");
const jsonfile = require("jsonfile")
const spawn = require("cross-spawn");
const simpleGit = require("simple-git/promise");
const { red, green, yellow } = require("colors");

const git = simpleGit(path.resolve(__dirname, "../"));


process.on("unhandledRejection", (error) => {
  console.log(red(error));
  process.exit(0);
});

(async function () {
  const spinner = ora({ spinner: "arrow" });
  try {
    spinner.start(yellow.bold("正在将js转换成es5"));
    // spawn.sync("babel", [
    //   path.resolve(__dirname, "../src/"),
    //   "--out-dir",
    //   path.resolve(__dirname, "../dist/")
    // ]);
    spinner.succeed(green("js文件转换成功!"));
  } catch (error) {
    spinner.fail(red("js文件转换失败!"));
    throw error;
  } finally {
    spinner.stop();
  };

  try {
    spinner.start(yellow.bold("正在进行git提交操作"));
    await git.init();
    await git.add("*");
    await git.commit(`${moment().format("YYYY年MM月DD日HH点mm分ss秒")}版本提交`);
    spawn.sync("npm", ["version", "patch"]);
    const { version } = await jsonfile.readFile(path.resolve(__dirname, "../package.json"));
    await git.tag([version]);
    spinner.succeed(green("所有文件提交成功!"));
  } catch (error) {
    spinner.fail(red("文件提交失败!"));
    throw error;
  } finally {
    spinner.stop();
  };

  if ((await git.getRemotes()).length === 0) {
    spinner.fail(red("该项目没有设置远程仓库"));
  } else {
    try {
      spinner.succeed(green("检测到远程仓库"));
      spinner.start(yellow.bold("将编译结果push到git仓库"));
      await git.push();
      spinner.succeed(green("push成功!"));
      spinner.succeed(green("发布成功!"));
    } catch (error) {
      spinner.fail(red("push失败!"));
      spinner.fail(red("发布失败!"));
      throw error;
    } finally {
      spinner.stop();
    };
  };
})();





