const Sitemap = require("react-router-sitemap").default;
const routes = require("./src/router/Router.jsx"); // Update the path to your Router.js file
function generateSitemap() {
  return new Sitemap(routes)
    .build("https://vipswallet.com") // Replace with your website's base URL
    .save("./public/sitemap.xml"); // The location where the sitemap will be saved
}

generateSitemap();
