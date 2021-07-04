const swaggerHTML = (apiPath: string) =>
  `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
  <link href="http://cdn.bootcss.com/swagger-ui/3.0.19/swagger-ui.css" rel="stylesheet">

  <style>
    html
    {
        box-sizing: border-box;
        overflow: -moz-scrollbars-vertical;
        overflow-y: scroll;
    }
    *,
    *:before,
    *:after
    {
        box-sizing: inherit;
    }
    body {
      margin:0;
      background: #fafafa;
    }

  </style>
</head>

<body>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
    <defs>
      <symbol viewBox="0 0 20 20" id="unlocked">
            <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V6h2v-.801C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8z"></path>
      </symbol>

      <symbol viewBox="0 0 20 20" id="locked">
        <path d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387C5.672 18.861 6.55 19 7.1 19h5.8c.549 0 1.428-.139 1.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3c1.203 0 2 .754 2 2.199V8z"/>
      </symbol>

      <symbol viewBox="0 0 20 20" id="close">
        <path d="M14.348 14.849c-.469.469-1.229.469-1.697 0L10 11.819l-2.651 3.029c-.469.469-1.229.469-1.697 0-.469-.469-.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-.469-.469-.469-1.228 0-1.697.469-.469 1.228-.469 1.697 0L10 8.183l2.651-3.031c.469-.469 1.228-.469 1.697 0 .469.469.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c.469.469.469 1.229 0 1.698z"/>
      </symbol>

      <symbol viewBox="0 0 20 20" id="large-arrow">
        <path d="M13.25 10L6.109 2.58c-.268-.27-.268-.707 0-.979.268-.27.701-.27.969 0l7.83 7.908c.268.271.268.709 0 .979l-7.83 7.908c-.268.271-.701.27-.969 0-.268-.269-.268-.707 0-.979L13.25 10z"/>
      </symbol>

      <symbol viewBox="0 0 20 20" id="large-arrow-down">
        <path d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"/>
      </symbol>


      <symbol viewBox="0 0 24 24" id="jump-to">
        <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
      </symbol>

      <symbol viewBox="0 0 24 24" id="expand">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
      </symbol>

    </defs>
  </svg>

  <div id="swagger-ui"></div>

  <script src="http://cdn.bootcss.com/swagger-ui/3.0.19/swagger-ui-bundle.js"></script>
  <script src="http://cdn.bootcss.com/swagger-ui/3.0.19/swagger-ui-standalone-preset.js"></script>
  <script>
  window.onload = function() {
    // Build a system
    const ui = SwaggerUIBundle({
      url: "${apiPath}",
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    })
    window.ui = ui
  }
  </script>
</body>

</html>

`;

swaggerHTML

const prefix = 'https://cdn.jsdelivr.net/npm/@chenxxx/swagger-ui@0.0.1/static/'
const getHtml = (apiPath: string) => `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link rel="icon" type="image/png" href="${prefix}favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="${prefix}favicon-16x16.png" sizes="16x16" />
  <link href='${prefix}typography.css' media='screen' rel='stylesheet' type='text/css' />
  <link href='${prefix}reset.css' media='screen' rel='stylesheet' type='text/css' />
  <link href='${prefix}screen.css' media='screen' rel='stylesheet' type='text/css' />
  <link href='${prefix}reset.css' media='print' rel='stylesheet' type='text/css' />
  <link href='${prefix}print.css' media='print' rel='stylesheet' type='text/css' />

  <script src='${prefix}object-assign-pollyfill.js' type='text/javascript'></script>
  <script src='${prefix}jquery-1.8.0.min.js' type='text/javascript'></script>
  <script src='${prefix}jquery.slideto.min.js' type='text/javascript'></script>
  <script src='${prefix}jquery.wiggle.min.js' type='text/javascript'></script>
  <script src='${prefix}jquery.ba-bbq.min.js' type='text/javascript'></script>
  <script src='${prefix}handlebars-4.0.5.js' type='text/javascript'></script>
  <script src='${prefix}lodash.min.js' type='text/javascript'></script>
  <script src='${prefix}backbone-min.js' type='text/javascript'></script>
  <script src='${prefix}swagger-ui.js' type='text/javascript'></script>
  <script src='${prefix}highlight.9.1.0.pack.js' type='text/javascript'></script>
  <script src='${prefix}highlight.9.1.0.pack_extended.js' type='text/javascript'></script>
  <script src='${prefix}jsoneditor.min.js' type='text/javascript'></script>
  <script src='${prefix}marked.js' type='text/javascript'></script>
  <script src='${prefix}swagger-oauth.js' type='text/javascript'></script>

  <!-- Swagger UT theme -->

  <link href="https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/2.x/theme-feeling-blue.css" rel="stylesheet" />
  <!-- Some basic translations -->
  <!-- <script src='lang/translator.js' type='text/javascript'></script> -->
  <!-- <script src='lang/ru.js' type='text/javascript'></script> -->
  <!-- <script src='lang/en.js' type='text/javascript'></script> -->

  <script type="text/javascript">
    $(function () {
      var url = window.location.search.match(/url=([^&]+)/);
      if (url && url.length > 1) {
        url = decodeURIComponent(url[1]);
      } else {
        url = "${apiPath}";
      }

      hljs.configure({
        highlightSizeThreshold: 5000
      });

      // Pre load translate...
      if (window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
      }
      window.swaggerUi = new SwaggerUi({
        url: url,
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        onComplete: function (swaggerApi, swaggerUi) {
          if (typeof initOAuth == "function") {
            initOAuth({
              clientId: "your-client-id",
              clientSecret: "your-client-secret-if-required",
              realm: "your-realms",
              appName: "your-app-name",
              scopeSeparator: " ",
              additionalQueryStringParams: {}
            });
          }

          if (window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
          }
        },
        onFailure: function (data) {
          log("Unable to Load SwaggerUI");
        },
        docExpansion: "none",
        jsonEditor: false,
        defaultModelRendering: 'schema',
        showRequestHeaders: false
      });

      window.swaggerUi.load();

      function log() {
        if ('console' in window) {
          console.log.apply(console, arguments);
        }
      }
    });
  </script>
</head>

<body class="swagger-section">
  <div id='header'>
    <div class="swagger-ui-wrap">
      <a id="logo" href="http://swagger.io"><img class="logo__img" alt="swagger" height="30" width="30"
          src="${prefix}logo_small.png" /><span class="logo__title">swagger</span></a>
      <form id='api_selector'>
        <div class='input'><input placeholder="http://example.com/api" id="input_baseUrl" name="baseUrl" type="text" />
        </div>
        <div id='auth_container'></div>
        <div class='input'><a id="explore" class="header__btn" href="#" data-sw-translate>Explore</a></div>
      </form>
    </div>
  </div>

  <div id="message-bar" class="swagger-ui-wrap" data-sw-translate>&nbsp;</div>

  <div id="swagger-ui-container" class="swagger-ui-wrap"></div>
</body>

</html>
`

export default getHtml;
