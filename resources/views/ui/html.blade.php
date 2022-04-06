<html>

    <head>
        <title>Plant Diary</title>
        <meta id="csrf" name="csrf-token" content="{{ csrf_token() }}">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <link rel="stylesheet" src={{ asset('css/app.css') }} />
        <script src="https://kit.fontawesome.com/b6954c4ea5.js" crossorigin="anonymous"></script>
    </head>

    <body>

        <div id="root"></div>
        
        <script src={{ asset("js/app.js") }}></script>

    </body>
</html>