<!DOCTYPE html>
<html ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- <link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic'> -->
    <!-- Font Awesome -->
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"> -->
    <title>Efico</title>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="eficos/libs/bower/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="eficos/libs/bower/material-design-iconic-font/dist/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" href="eficos/libs/bower/animate.css/animate.min.css">
    <link rel="stylesheet" href="eficos/css/bootstrap.css">
    <link rel="stylesheet" href="eficos/css/app.min.css">
    <link rel="stylesheet" href="eficos/css/misc-pages.css">
    <link rel="stylesheet" href="{!! elixir('css/final.css') !!}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:400,500,600,700,800,900,300">
    <!-- Scripts -->
    <script src="eficos/libs/bower/breakpoints.js/dist/breakpoints.min.js"></script>
    <script>Breakpoints();</script>
</head>
<body class="menubar-top  theme-primary menubar-light pace-done">
    <div route-bodyclass ui-view="layout">
    </div>
    <!-- <script src="eficos/js/core.min.js"></script>
    <script src="eficos/js/app.min.js"></script>
    <script src="eficos/libs/bower/moment/moment.js"></script>
    <script src="eficos/libs/bower/fullcalendar/dist/fullcalendar.min.js"></script>
    <script src="eficos/js/fullcalendar.js"></script>
    <script src="eficos/libs/bower/jquery/dist/jquery.js"></script> -->
    <script src="{!! elixir('js/final.js') !!}"></script>
</body>
</html>
