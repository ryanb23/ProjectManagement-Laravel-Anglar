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
    <link rel="stylesheet" href="{!! elixir('css/final.css') !!}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:400,500,600,700,800,900,300">

</head>
<body class="menubar-top theme-primary menubar-light pace-done">
    <div route-bodyclass ui-view="layout">
    </div>

    <script src="{!! elixir('js/final.js') !!}"></script>
    <script src="//js.pusher.com/4.0/pusher.min.js"></script>
    <script>
      //instantiate a Pusher object with our Credential's key
      var pusher = new Pusher('10fc757079ccb460a820', {
          cluster: 'us2',
          encrypted: true
      });

      //Subscribe to the channel we specified in our Laravel Event
      var channel = pusher.subscribe('test-channel');

      //Bind a function to a Event (the full Laravel class)
      channel.bind('App\\Events\\MessagePostEvent', function(data) {
        console.log('An event was triggered with message: ' + data.message);
      });
    </script>
</body>
</html>
