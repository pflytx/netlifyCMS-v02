const Nunjucks = require("nunjucks"),
  markdown = require("nunjucks-markdown"),
  marked = require("marked");

module.exports = function (eleventyConfig) {
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("./", {
      watch: process.env.NODE_ENV && process.env.NODE_ENV.includes("dev"),
    })
  );
  markdown.register(nunjucksEnvironment, marked);

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
  eleventyConfig.addWatchTarget("./components");
  eleventyConfig.addWatchTarget("./images");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addFilter("log", (value) => {
    console.log(value);
  });
};
