exports['generate-examples-index snapshots broken html directory structure 1'] = [
  "generated/assets/screenshot.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.png",
  "generated/assets/screenshot.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.png",
  "generated/assets/screenshot.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.png",
  "generated/assets/screenshot.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.png",
  "generated/assets/screenshot.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.png",
  "generated/assets/screenshot.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.png",
  "generated/assets/screenshot.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.png",
  "generated/index/examples.css",
  "generated/index/index.html",
  "generated/pages/codepen.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html",
  "generated/pages/codepen.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html",
  "generated/pages/codepen.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html",
  "generated/pages/codepen.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html",
  "generated/pages/codepen.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html",
  "generated/pages/codepen.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html",
  "generated/pages/codepen.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html",
  "generated/pages/jsfiddle.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html",
  "generated/pages/jsfiddle.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html",
  "generated/pages/jsfiddle.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html",
  "generated/pages/jsfiddle.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html",
  "generated/pages/jsfiddle.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html",
  "generated/pages/jsfiddle.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html",
  "generated/pages/jsfiddle.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html"
]

exports['generate-examples-index snapshots broken html file contents generated/index/examples.css'] = `
.examples-root {
  margin: 50px auto 200px;
  min-width: calc(200px + 2em);
  width: calc(100vw - 200px);
}

.examples-root a {
  color: #2b7ce9;
}
.examples-root a:visited {
  color: #46417a;
}

.examples-root .example-link {
  margin: 1em;
  position: relative;
  width: 200px;

  display: inline-block;
}

.examples-root .example-link .example-image {
  display: block;
  height: 200px;
  margin-top: 1ex;
  position: relative;
  width: 200px;
}
.examples-root .example-link .example-image > img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 200px;

  background: #2b7ce9;
  border: 1px solid #2b7ce9;
  color: #ffffff;

  transition: transform 0.5s ease 0s, z-index 0.5s linear 0s;
  z-index: 1;
}
.examples-root .example-link:hover .example-image > img {
  transform: translate(0px, 95px) scale(2, 2);
  z-index: 100;
}

.examples-root .example-header > *:last-child {
  margin-left: 0.5em;
}
.examples-root .icon {
  height: 1.5em;
  margin-bottom: -0.25em;
  width: 1.5em;

  background: none;
  border: none;
  cursor: pointer;
  display: inline-block;
}
.examples-root .icon.jsfiddle {
  background-size: contain;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%232b7ce9' d='M16.45,17.5C17.45,17.5 18.3,17.15 19,16.5C19.67,15.8 20,15 20,14C20,13.05 19.66,12.22 18.96,11.53C18.26,10.84 17.41,10.5 16.41,10.5C15.47,10.5 14.64,10.83 13.92,11.5L9.14,15.56C8.7,16 8.17,16.22 7.55,16.22C6.92,16.22 6.39,16 5.95,15.56C5.5,15.13 5.3,14.61 5.3,14C5.3,13.42 5.5,12.91 5.95,12.47C6.39,12.03 6.92,11.81 7.55,11.81C8.14,11.81 8.69,12.03 9.19,12.47L9.94,13.13L10.92,12.23L10.08,11.53C9.39,10.84 8.55,10.5 7.55,10.5C6.58,10.5 5.74,10.84 5.04,11.53C4.34,12.22 4,13.05 4,14C4,15 4.34,15.8 5.04,16.5C5.74,17.15 6.59,17.5 7.59,17.5C8.53,17.5 9.36,17.16 10.08,16.5L14.86,12.42C15.27,12 15.8,11.81 16.45,11.81C17.08,11.81 17.61,12.03 18.05,12.47C18.5,12.91 18.7,13.42 18.7,14C18.7,14.61 18.5,15.13 18.05,15.56C17.61,16 17.08,16.22 16.45,16.22C15.89,16.22 15.34,16 14.81,15.5L14.06,14.86L13.08,15.75L13.92,16.45C14.61,17.14 15.45,17.5 16.45,17.5M19.36,10.03C20.64,10.13 21.73,10.65 22.64,11.6C23.55,12.55 24,13.69 24,15C24,16.38 23.5,17.55 22.5,18.54C21.54,19.5 20.36,20 19,20H6C4.34,20 2.93,19.43 1.76,18.26C0.59,17.09 0,15.67 0,14C0,12.55 0.5,11.23 1.57,10.05C2.62,8.88 3.88,8.22 5.34,8.06C6,6.84 6.92,5.86 8.11,5.11C9.3,4.36 10.59,4 12,4C13.69,4 15.26,4.58 16.71,5.77C18.16,6.95 19.05,8.38 19.36,10.03Z' /%3E%3C/svg%3E");
}
.examples-root .icon.codepen {
  background-size: contain;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%232b7ce9' d='M15.09,12L12,14.08V14.09L8.91,12L12,9.92V9.92L15.09,12M12,2C11.84,2 11.68,2.06 11.53,2.15L2.5,8.11C2.27,8.22 2.09,8.43 2,8.67V14.92C2,15.33 2,15.33 2.15,15.53L11.53,21.86C11.67,21.96 11.84,22 12,22C12.16,22 12.33,21.95 12.47,21.85L21.85,15.5C22,15.33 22,15.33 22,14.92V8.67C21.91,8.42 21.73,8.22 21.5,8.1L12.47,2.15C12.32,2.05 12.16,2 12,2M16.58,13L19.59,15.04L12.83,19.6V15.53L16.58,13M19.69,8.9L16.58,11L12.83,8.47V4.38L19.69,8.9M20.33,10.47V13.53L18.07,12L20.33,10.47M7.42,13L11.17,15.54V19.6L4.41,15.04L7.42,13M4.31,8.9L11.17,4.39V8.5L7.42,11L4.31,8.9M3.67,10.5L5.93,12L3.67,13.54V10.5Z' /%3E%3C/svg%3E");
}

`

exports['generate-examples-index snapshots broken html file contents generated/index/index.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test Examples</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="stylesheet" type="text/css" href="examples.css" />
  </head>
  <body>
    <div class="examples-root">
      <div>
        <h1>Test</h1>
        <div>
          <span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/examples/example-alert.html"
                >Alert</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/examples/example-alert.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.png"
                alt="Alert"/></a></span
          ><span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/example-broken.html"
                >Broken</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/example-broken.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.png"
                alt="Broken"/></a></span
          ><span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/examples/example-confirm.html"
                >Confirm</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/examples/example-confirm.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.png"
                alt="Confirm"/></a></span
          ><span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/examples/example-1.html"
                >Number 1</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/examples/example-1.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.png"
                alt="Number 1"/></a></span
          ><span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/examples/example-2.html"
                >Number 2</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/examples/example-2.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.png"
                alt="Number 2"/></a
          ></span>
        </div>
        <div>
          <h2>Subdir</h2>
          <div>
            <span class="example-link"
              ><div class="example-header">
                <a
                  class="icon jsfiddle"
                  href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html"
                  title="JSFiddle"
                ></a
                ><a
                  class="icon codepen"
                  href="https://visjs.github.io/vis-test/public/examples/pages/codepen.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html"
                  title="CodePen"
                ></a
                ><a
                  href="https://visjs.github.io/vis-test/examples/examples/subdir/example-3.html"
                  >Number 3</a
                >
              </div>
              <a
                class="example-image"
                href="https://visjs.github.io/vis-test/examples/examples/subdir/example-3.html"
                ><img
                  src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.png"
                  alt="Number 3"/></a></span
            ><span class="example-link"
              ><div class="example-header">
                <a
                  class="icon jsfiddle"
                  href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html"
                  title="JSFiddle"
                ></a
                ><a
                  class="icon codepen"
                  href="https://visjs.github.io/vis-test/public/examples/pages/codepen.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html"
                  title="CodePen"
                ></a
                ><a
                  href="https://visjs.github.io/vis-test/examples/examples/subdir/example-4.html"
                  >Number 4</a
                >
              </div>
              <a
                class="example-image"
                href="https://visjs.github.io/vis-test/examples/examples/subdir/example-4.html"
                ><img
                  src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.png"
                  alt="Number 4"/></a
            ></span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/codepen.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 3&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js","title":"Test | Subdir | Number 3"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/codepen.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 4&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js","title":"Test | Subdir | Number 4"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/codepen.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Broken</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;&lt;/div&gt;\\n","js":"\\n","js_external":"","title":"Test | Broken"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/codepen.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Alert&lt;/div&gt;\\n","js":"alert(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Alert"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/codepen.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element-number-2\\"&gt;Number 2&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Number 2"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/codepen.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 1&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Number 1"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/codepen.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Confirm&lt;/div&gt;\\n","js":"Confirm(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Confirm"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/jsfiddle.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 3&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 3" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/jsfiddle.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 4&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 4" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/jsfiddle.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Broken</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value="
"
      />
      <input type="hidden" name="resources" value />
      <input type="hidden" name="title" value="Test | Broken" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/jsfiddle.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Alert&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='alert("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Alert" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/jsfiddle.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element-number-2"&gt;Number 2&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 2" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/jsfiddle.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 1&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 1" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken html file contents generated/pages/jsfiddle.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Confirm&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='Confirm("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Confirm" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md directory structure 1'] = [
  "generated/assets/screenshot.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.png",
  "generated/assets/screenshot.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.png",
  "generated/assets/screenshot.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.png",
  "generated/assets/screenshot.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.png",
  "generated/assets/screenshot.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.png",
  "generated/assets/screenshot.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.png",
  "generated/assets/screenshot.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.png",
  "generated/index/README.md",
  "generated/index/test.md",
  "generated/index/test.subdir.md",
  "generated/pages/codepen.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html",
  "generated/pages/codepen.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html",
  "generated/pages/codepen.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html",
  "generated/pages/codepen.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html",
  "generated/pages/codepen.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html",
  "generated/pages/codepen.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html",
  "generated/pages/codepen.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html",
  "generated/pages/jsfiddle.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html",
  "generated/pages/jsfiddle.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html",
  "generated/pages/jsfiddle.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html",
  "generated/pages/jsfiddle.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html",
  "generated/pages/jsfiddle.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html",
  "generated/pages/jsfiddle.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html",
  "generated/pages/jsfiddle.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html"
]

exports['generate-examples-index snapshots broken md file contents generated/index/README.md'] = `
# Examples

- [Test](./test.md)
- [Subdir](./test.subdir.md)

`

exports['generate-examples-index snapshots broken md file contents generated/index/test.md'] = `
# Test

## Alert

[![Alert](./../assets/screenshot.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.png)](https://visjs.github.io/vis-test/examples/examples/example-alert.html)

[Open](https://visjs.github.io/vis-test/examples/examples/example-alert.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html)

## Broken

[![Broken](./../assets/screenshot.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.png)](https://visjs.github.io/vis-test/examples/example-broken.html)

[Open](https://visjs.github.io/vis-test/examples/example-broken.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html)

## Confirm

[![Confirm](./../assets/screenshot.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.png)](https://visjs.github.io/vis-test/examples/examples/example-confirm.html)

[Open](https://visjs.github.io/vis-test/examples/examples/example-confirm.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html)

## Number 1

[![Number 1](./../assets/screenshot.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.png)](https://visjs.github.io/vis-test/examples/examples/example-1.html)

[Open](https://visjs.github.io/vis-test/examples/examples/example-1.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html)

## Number 2

[![Number 2](./../assets/screenshot.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.png)](https://visjs.github.io/vis-test/examples/examples/example-2.html)

[Open](https://visjs.github.io/vis-test/examples/examples/example-2.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html)

`

exports['generate-examples-index snapshots broken md file contents generated/index/test.subdir.md'] = `
# Subdir

## Number 3

[![Number 3](./../assets/screenshot.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.png)](https://visjs.github.io/vis-test/examples/examples/subdir/example-3.html)

[Open](https://visjs.github.io/vis-test/examples/examples/subdir/example-3.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html)

## Number 4

[![Number 4](./../assets/screenshot.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.png)](https://visjs.github.io/vis-test/examples/examples/subdir/example-4.html)

[Open](https://visjs.github.io/vis-test/examples/examples/subdir/example-4.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html)

`

exports['generate-examples-index snapshots broken md file contents generated/pages/codepen.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 3&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js","title":"Test | Subdir | Number 3"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/codepen.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 4&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js","title":"Test | Subdir | Number 4"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/codepen.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Broken</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;&lt;/div&gt;\\n","js":"\\n","js_external":"","title":"Test | Broken"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/codepen.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Alert&lt;/div&gt;\\n","js":"alert(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Alert"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/codepen.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element-number-2\\"&gt;Number 2&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Number 2"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/codepen.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 1&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Number 1"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/codepen.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Confirm&lt;/div&gt;\\n","js":"Confirm(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js","title":"Test | Confirm"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/jsfiddle.3e7b94deaa4f2f8e422a2ce9ec254cf4625e6539c4dfe0e668ae0196fea17aac.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 3&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 3" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/jsfiddle.a074ee18e757e26d1f43b10d7163792770e5570fd73946151c0ffdd8be06b672.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 4&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 4" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/jsfiddle.a108cb76357e3ab8de5c94b9f9f1d93af829422bfdfabef395e3040b6b5f14c4.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Broken</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value="
"
      />
      <input type="hidden" name="resources" value />
      <input type="hidden" name="title" value="Test | Broken" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/jsfiddle.c7ef6d845efd009c21eb7b980bbe7202d9b3e0644582f13114226e01f1850d58.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Alert&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='alert("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Alert" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/jsfiddle.de84e98a1dbcb3b598de32505c0f2c086fd20e8b5b8dd0f9594a6657ec078ba0.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element-number-2"&gt;Number 2&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 2" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/jsfiddle.fa8d6f3d7111f6f85b9df5b0f039e6f14420bb299e3e389d8f1fa29eaa4ecc8b.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 1&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 1" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots broken md file contents generated/pages/jsfiddle.ff87f07f504b4f356be9f45d6e04b8355ffc8f2aff46852b8ddbe7f0e9f3b8ef.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Confirm&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='Confirm("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/broken-examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Confirm" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html directory structure 1'] = [
  "generated/assets/screenshot.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.png",
  "generated/assets/screenshot.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.png",
  "generated/assets/screenshot.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.png",
  "generated/assets/screenshot.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.png",
  "generated/assets/screenshot.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.png",
  "generated/assets/screenshot.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.png",
  "generated/index/examples.css",
  "generated/index/index.html",
  "generated/pages/codepen.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html",
  "generated/pages/codepen.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html",
  "generated/pages/codepen.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html",
  "generated/pages/codepen.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html",
  "generated/pages/codepen.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html",
  "generated/pages/codepen.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html",
  "generated/pages/jsfiddle.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html",
  "generated/pages/jsfiddle.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html",
  "generated/pages/jsfiddle.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html",
  "generated/pages/jsfiddle.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html",
  "generated/pages/jsfiddle.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html",
  "generated/pages/jsfiddle.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html"
]

exports['generate-examples-index snapshots okay html file contents generated/index/examples.css'] = `
.examples-root {
  margin: 50px auto 200px;
  min-width: calc(200px + 2em);
  width: calc(100vw - 200px);
}

.examples-root a {
  color: #2b7ce9;
}
.examples-root a:visited {
  color: #46417a;
}

.examples-root .example-link {
  margin: 1em;
  position: relative;
  width: 200px;

  display: inline-block;
}

.examples-root .example-link .example-image {
  display: block;
  height: 200px;
  margin-top: 1ex;
  position: relative;
  width: 200px;
}
.examples-root .example-link .example-image > img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 200px;

  background: #2b7ce9;
  border: 1px solid #2b7ce9;
  color: #ffffff;

  transition: transform 0.5s ease 0s, z-index 0.5s linear 0s;
  z-index: 1;
}
.examples-root .example-link:hover .example-image > img {
  transform: translate(0px, 95px) scale(2, 2);
  z-index: 100;
}

.examples-root .example-header > *:last-child {
  margin-left: 0.5em;
}
.examples-root .icon {
  height: 1.5em;
  margin-bottom: -0.25em;
  width: 1.5em;

  background: none;
  border: none;
  cursor: pointer;
  display: inline-block;
}
.examples-root .icon.jsfiddle {
  background-size: contain;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%232b7ce9' d='M16.45,17.5C17.45,17.5 18.3,17.15 19,16.5C19.67,15.8 20,15 20,14C20,13.05 19.66,12.22 18.96,11.53C18.26,10.84 17.41,10.5 16.41,10.5C15.47,10.5 14.64,10.83 13.92,11.5L9.14,15.56C8.7,16 8.17,16.22 7.55,16.22C6.92,16.22 6.39,16 5.95,15.56C5.5,15.13 5.3,14.61 5.3,14C5.3,13.42 5.5,12.91 5.95,12.47C6.39,12.03 6.92,11.81 7.55,11.81C8.14,11.81 8.69,12.03 9.19,12.47L9.94,13.13L10.92,12.23L10.08,11.53C9.39,10.84 8.55,10.5 7.55,10.5C6.58,10.5 5.74,10.84 5.04,11.53C4.34,12.22 4,13.05 4,14C4,15 4.34,15.8 5.04,16.5C5.74,17.15 6.59,17.5 7.59,17.5C8.53,17.5 9.36,17.16 10.08,16.5L14.86,12.42C15.27,12 15.8,11.81 16.45,11.81C17.08,11.81 17.61,12.03 18.05,12.47C18.5,12.91 18.7,13.42 18.7,14C18.7,14.61 18.5,15.13 18.05,15.56C17.61,16 17.08,16.22 16.45,16.22C15.89,16.22 15.34,16 14.81,15.5L14.06,14.86L13.08,15.75L13.92,16.45C14.61,17.14 15.45,17.5 16.45,17.5M19.36,10.03C20.64,10.13 21.73,10.65 22.64,11.6C23.55,12.55 24,13.69 24,15C24,16.38 23.5,17.55 22.5,18.54C21.54,19.5 20.36,20 19,20H6C4.34,20 2.93,19.43 1.76,18.26C0.59,17.09 0,15.67 0,14C0,12.55 0.5,11.23 1.57,10.05C2.62,8.88 3.88,8.22 5.34,8.06C6,6.84 6.92,5.86 8.11,5.11C9.3,4.36 10.59,4 12,4C13.69,4 15.26,4.58 16.71,5.77C18.16,6.95 19.05,8.38 19.36,10.03Z' /%3E%3C/svg%3E");
}
.examples-root .icon.codepen {
  background-size: contain;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%232b7ce9' d='M15.09,12L12,14.08V14.09L8.91,12L12,9.92V9.92L15.09,12M12,2C11.84,2 11.68,2.06 11.53,2.15L2.5,8.11C2.27,8.22 2.09,8.43 2,8.67V14.92C2,15.33 2,15.33 2.15,15.53L11.53,21.86C11.67,21.96 11.84,22 12,22C12.16,22 12.33,21.95 12.47,21.85L21.85,15.5C22,15.33 22,15.33 22,14.92V8.67C21.91,8.42 21.73,8.22 21.5,8.1L12.47,2.15C12.32,2.05 12.16,2 12,2M16.58,13L19.59,15.04L12.83,19.6V15.53L16.58,13M19.69,8.9L16.58,11L12.83,8.47V4.38L19.69,8.9M20.33,10.47V13.53L18.07,12L20.33,10.47M7.42,13L11.17,15.54V19.6L4.41,15.04L7.42,13M4.31,8.9L11.17,4.39V8.5L7.42,11L4.31,8.9M3.67,10.5L5.93,12L3.67,13.54V10.5Z' /%3E%3C/svg%3E");
}

`

exports['generate-examples-index snapshots okay html file contents generated/index/index.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test Examples</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="stylesheet" type="text/css" href="examples.css" />
  </head>
  <body>
    <div class="examples-root">
      <div>
        <h1>Test</h1>
        <div>
          <span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/example-alert.html"
                >Alert</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/example-alert.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.png"
                alt="Alert"/></a></span
          ><span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/example-confirm.html"
                >Confirm</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/example-confirm.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.png"
                alt="Confirm"/></a></span
          ><span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/example-1.html"
                >Number 1</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/example-1.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.png"
                alt="Number 1"/></a></span
          ><span class="example-link"
            ><div class="example-header">
              <a
                class="icon jsfiddle"
                href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html"
                title="JSFiddle"
              ></a
              ><a
                class="icon codepen"
                href="https://visjs.github.io/vis-test/public/examples/pages/codepen.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html"
                title="CodePen"
              ></a
              ><a
                href="https://visjs.github.io/vis-test/examples/example-2.html"
                >Number 2</a
              >
            </div>
            <a
              class="example-image"
              href="https://visjs.github.io/vis-test/examples/example-2.html"
              ><img
                src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.png"
                alt="Number 2"/></a
          ></span>
        </div>
        <div>
          <h2>Subdir</h2>
          <div>
            <span class="example-link"
              ><div class="example-header">
                <a
                  class="icon jsfiddle"
                  href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html"
                  title="JSFiddle"
                ></a
                ><a
                  class="icon codepen"
                  href="https://visjs.github.io/vis-test/public/examples/pages/codepen.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html"
                  title="CodePen"
                ></a
                ><a
                  href="https://visjs.github.io/vis-test/examples/subdir/example-3.html"
                  >Number 3</a
                >
              </div>
              <a
                class="example-image"
                href="https://visjs.github.io/vis-test/examples/subdir/example-3.html"
                ><img
                  src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.png"
                  alt="Number 3"/></a></span
            ><span class="example-link"
              ><div class="example-header">
                <a
                  class="icon jsfiddle"
                  href="https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html"
                  title="JSFiddle"
                ></a
                ><a
                  class="icon codepen"
                  href="https://visjs.github.io/vis-test/public/examples/pages/codepen.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html"
                  title="CodePen"
                ></a
                ><a
                  href="https://visjs.github.io/vis-test/examples/subdir/example-4.html"
                  >Number 4</a
                >
              </div>
              <a
                class="example-image"
                href="https://visjs.github.io/vis-test/examples/subdir/example-4.html"
                ><img
                  src="https://visjs.github.io/vis-test/public/examples/assets/screenshot.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.png"
                  alt="Number 4"/></a
            ></span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/codepen.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 3&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js","title":"Test | Subdir | Number 3"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/codepen.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Alert&lt;/div&gt;\\n","js":"alert(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Alert"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/codepen.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Confirm&lt;/div&gt;\\n","js":"Confirm(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Confirm"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/codepen.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element-number-2\\"&gt;Number 2&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Number 2"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/codepen.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 4&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js","title":"Test | Subdir | Number 4"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/codepen.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 1&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Number 1"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/jsfiddle.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 3&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 3" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/jsfiddle.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Alert&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='alert("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Alert" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/jsfiddle.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Confirm&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='Confirm("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Confirm" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/jsfiddle.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element-number-2"&gt;Number 2&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 2" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/jsfiddle.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 4&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 4" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay html file contents generated/pages/jsfiddle.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 1&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 1" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md directory structure 1'] = [
  "generated/assets/screenshot.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.png",
  "generated/assets/screenshot.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.png",
  "generated/assets/screenshot.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.png",
  "generated/assets/screenshot.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.png",
  "generated/assets/screenshot.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.png",
  "generated/assets/screenshot.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.png",
  "generated/index/README.md",
  "generated/index/test.md",
  "generated/index/test.subdir.md",
  "generated/pages/codepen.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html",
  "generated/pages/codepen.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html",
  "generated/pages/codepen.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html",
  "generated/pages/codepen.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html",
  "generated/pages/codepen.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html",
  "generated/pages/codepen.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html",
  "generated/pages/jsfiddle.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html",
  "generated/pages/jsfiddle.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html",
  "generated/pages/jsfiddle.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html",
  "generated/pages/jsfiddle.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html",
  "generated/pages/jsfiddle.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html",
  "generated/pages/jsfiddle.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html"
]

exports['generate-examples-index snapshots okay md file contents generated/index/README.md'] = `
# Examples

- [Test](./test.md)
- [Subdir](./test.subdir.md)

`

exports['generate-examples-index snapshots okay md file contents generated/index/test.md'] = `
# Test

## Alert

[![Alert](./../assets/screenshot.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.png)](https://visjs.github.io/vis-test/examples/example-alert.html)

[Open](https://visjs.github.io/vis-test/examples/example-alert.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html)

## Confirm

[![Confirm](./../assets/screenshot.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.png)](https://visjs.github.io/vis-test/examples/example-confirm.html)

[Open](https://visjs.github.io/vis-test/examples/example-confirm.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html)

## Number 1

[![Number 1](./../assets/screenshot.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.png)](https://visjs.github.io/vis-test/examples/example-1.html)

[Open](https://visjs.github.io/vis-test/examples/example-1.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html)

## Number 2

[![Number 2](./../assets/screenshot.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.png)](https://visjs.github.io/vis-test/examples/example-2.html)

[Open](https://visjs.github.io/vis-test/examples/example-2.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html)

`

exports['generate-examples-index snapshots okay md file contents generated/index/test.subdir.md'] = `
# Subdir

## Number 3

[![Number 3](./../assets/screenshot.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.png)](https://visjs.github.io/vis-test/examples/subdir/example-3.html)

[Open](https://visjs.github.io/vis-test/examples/subdir/example-3.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html)

## Number 4

[![Number 4](./../assets/screenshot.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.png)](https://visjs.github.io/vis-test/examples/subdir/example-4.html)

[Open](https://visjs.github.io/vis-test/examples/subdir/example-4.html) | [JSFiddle](https://visjs.github.io/vis-test/public/examples/pages/jsfiddle.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html) | [CodePen](https://visjs.github.io/vis-test/public/examples/pages/codepen.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html)

`

exports['generate-examples-index snapshots okay md file contents generated/pages/codepen.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 3&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js","title":"Test | Subdir | Number 3"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/codepen.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Alert&lt;/div&gt;\\n","js":"alert(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Alert"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/codepen.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Confirm&lt;/div&gt;\\n","js":"Confirm(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Confirm"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/codepen.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element-number-2\\"&gt;Number 2&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Number 2"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/codepen.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 4&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js","title":"Test | Subdir | Number 4"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/codepen.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="https://codepen.io/pen/define"
      method="post"
      target="_self"
    >
      <input
        type="hidden"
        name="data"
        value='{"css":"","css_external":"","html":"&lt;div id=\\"test-element\\"&gt;Number 1&lt;/div&gt;\\n","js":"console.log(\\"This is just a test.\\");\\n","js_external":"https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js","title":"Test | Number 1"}'
      />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open CodePen
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/jsfiddle.1dbc99a43864cc4a8db6bf0fa9026ccf16506d2a52a10cb11b19117d61094a7a.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 3</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 3&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 3" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/jsfiddle.2a65e099315d1ef757d3d20051e36c238fdf37c5c8ebd7ee2c17c96a990aa3f5.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Alert</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Alert&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='alert("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Alert" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/jsfiddle.91c0c35e6b68c520f948951fc98d01b78f1dad911c228fcd9c0e12f5a71f13d8.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Confirm</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Confirm&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='Confirm("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Confirm" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/jsfiddle.c5a4768b7b3e3f352ed19771d7a888b2235459e0928aa9be6dc90806c2734aca.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 2</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element-number-2"&gt;Number 2&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 2" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/jsfiddle.d95699c10f3cb7a45ba323ed72a3eae1fdae9f7724de07a3f2b1f9661328bf36.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Subdir | Number 4</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 4&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/examples/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Subdir | Number 4" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`

exports['generate-examples-index snapshots okay md file contents generated/pages/jsfiddle.e71058a9f32542214dcc3d14f481584711471a6636b67a3dd233d2ed12974266.html'] = `
<html>
  <head>
    <meta charset="utf-8" />
    <title>Test | Number 1</title>
  </head>
  <body>
    <form
      id="form"
      action="http://jsfiddle.net/api/post/library/pure/"
      method="post"
      target="_self"
    >
      <input type="hidden" name="css" value />
      <input
        type="hidden"
        name="html"
        value='&lt;div id="test-element"&gt;Number 1&lt;/div&gt;
'
      />
      <input
        type="hidden"
        name="js"
        value='console.log("This is just a test.");
'
      />
      <input
        type="hidden"
        name="resources"
        value="https://visjs.github.io/vis-test/test/generate-examples-index/dist/test.min.js"
      />
      <input type="hidden" name="title" value="Test | Number 1" />
      <input type="hidden" name="wrap" value="b" />
      <button id="open" alt="JSFiddle" title="JSFiddle">
        Open JSFiddle
      </button>
    </form>

    <script type="text/javascript">
      document.getElementById("open").click();
    </script>
  </body>
</html>

`
