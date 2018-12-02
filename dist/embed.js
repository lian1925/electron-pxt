(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/",
    "workerjs": "/worker.js",
    "tdworkerjs": "/tdworker.js",
    "monacoworkerjs": "/monacoworker.js",
    "pxtVersion": "0.13.30",
    "pxtRelId": "",
    "pxtCdnUrl": "/",
    "commitCdnUrl": "/",
    "blobCdnUrl": "/",
    "cdnUrl": "/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "simUrl": "/simulator.html",
    "partsUrl": "/siminstructions.html",
    "runUrl": "/run.html",
    "docsUrl": "/docs.html",
    "isStatic": true
};

    var scripts = [
        "/highlight.js/highlight.pack.js",
        "/bluebird.min.js",
        "/typescript.js",
        "/semantic.js",
        "/marked/marked.min.js",
        "/lzma/lzma_worker-min.js",
        "/blockly/blockly_compressed.js",
        "/blockly/blocks_compressed.js",
        "/blockly/msg/js/en.js",
        "/pxtlib.js",
        "/pxtcompiler.js",
        "/pxtblocks.js",
        "/pxteditor.js",
        "/pxtsim.js",
        "/target.js",
        "/pxtrunner.js"
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/jquery.js")

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
