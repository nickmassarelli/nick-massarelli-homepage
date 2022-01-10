module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addWatchTarget('./src/assets')
  eleventyConfig.addWatchTarget('./src/js')
  eleventyConfig.addWatchTarget('./src/css')

  eleventyConfig.addPassthroughCopy({ './src/assets': '/assets' })
  eleventyConfig.addPassthroughCopy({ './src/js': '/js' })
  eleventyConfig.addPassthroughCopy({ './src/css': '/css' })

  return {
    htmlTemplateEngine: false,
    dir: {
      input: 'src',
    },
  }
}
