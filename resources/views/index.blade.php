<!DOCTYPE html>
<html ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <title>Efico</title>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="apple-touch-icon" href="pages/ico/60.png">
    <link rel="apple-touch-icon" sizes="76x76" href="pages/ico/76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="pages/ico/120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="pages/ico/152.png">
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta content="" name="description" />
    <meta content="" name="author" />

    <!-- BEGIN Vendor CSS-->
    <!-- <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" /> -->
    <link href="assets/plugins/bootstrapv3/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css" media="screen" />

    <link id="lazyload_placeholder">
    <!-- BEGIN Pages CSS-->
    <link href="pages/css/pages-icons.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{!! elixir('css/final.css') !!}">
    <link class="main-stylesheet" href="pages/css/pages.css" rel="stylesheet" type="text/css" />
    <!--[if lte IE 9]>
        <link href="pages/css/ie9.css" rel="stylesheet" type="text/css" />
    <![endif]-->
    <!--[if lt IE 9]>
            <link href="assets/plugins/mapplic/css/mapplic-ie.css" rel="stylesheet" type="text/css" />
    <![endif]-->

    <script type="text/javascript">
    window.onload = function() {
        // fix for windows 8
        if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
            document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="pages/css/windows.chrome.fix.css" />'
    }
    </script>

</head>
<body class="fixed-header"  ng-class="{
'bg-master-lighter': is('app.extra.timeline'),
'no-header': is('app.social') || is('app.calendar') || is('app.maps.vector') || is('app.maps.google'),
'menu-pin' : app.layout.menuPin,
'menu-behind' : app.layout.menuBehind
 }">
    <div route-bodyclass ui-view="layout" class="full-height">
    </div>

    <!-- Pusher JS-->
    <script src="//js.pusher.com/4.0/pusher.min.js"></script>

    <!-- BEGIN VENDOR JS -->
    <!-- JQUERY -->
    <!-- <script src="assets/plugins/pace/pace.min.js" type="text/javascript"></script> -->
    <script src="assets/plugins/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="assets/plugins/modernizr.custom.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
    <script src="assets/plugins/bootstrapv3/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery/jquery-easy.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-bez/jquery.bez.min.js"></script>
    <script src="assets/plugins/jquery-ios-list/jquery.ioslist.min.js" type="text/javascript"></script>
    <script src="assets/plugins/jquery-actual/jquery.actual.min.js"></script>
    <script src="assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js"></script>
    <script type="text/javascript" src="assets/plugins/classie/classie.js"></script>

    <!-- ANGULAR -->
    <script src="{!! elixir('js/final.js') !!}"></script>

    <!-- <script type="text/javascript" src="assets/plugins/angular-ui-grid/ui-grid.min.js"></script> -->
    <!-- <script src="assets/plugins/angular-sanitize/angular-sanitize.min.js" type="text/javascript"></script> -->
    <!-- <script src="assets/plugins/angular-oc-lazyload/ocLazyLoad.min.js" type="text/javascript"></script> -->

    <!-- END VENDOR JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <!-- END CORE TEMPLATE JS -->

    <!-- Yummer JS-->
    <script type="text/javascript" src="https://s0.assets-yammer.com/assets/platform_social_buttons.min.js"></script>

</body>
</html>
