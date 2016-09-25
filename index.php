<!DOCTYPE html>
<html>
    <head>
        <title>Title</title>
        <meta name="viewport" content="initial-scale=1.0">
        <meta charset="utf-8">
        <script type="text/javascript" src="data.json"></script>
        <script type="text/javascript" src="other.json"></script>
        <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
        <script type="text/javascript" src="js/tooltip.js"></script>
        <script type="text/javascript" src="js/point.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/parser.js"></script>
        <script type="text/javascript" src="js/filter.js"></script>
        <script type="text/javascript" src="js/nouislider.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCIB2vzs2SKyszqgZNrqKbqHfMZOUJDyo"></script>
        <link rel="stylesheet" type="text/css" href="css/main.css"/>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css"/>
        <link rel="stylesheet" type="text/css" href="css/nouislider.min.css"/>
    </head>
    <body>
        <script type="text/javascript">
           var realTimeJSON = <?= file_get_contents('http://portal.chmi.cz/files/portal/docs/uoco/web_generator/aqindex_cze.json'); ?>
        </script>
        <div class="map-container">
            <div id="map"></div>
        </div>
        <aside>
            <div class="icon">
                <i class="fa fa-chevron-left show-aside"></i>
                <i class="fa fa-chevron-right hide-aside"></i>
                <i class="fa fa-thumb-tack pin-aside"></i>
            </div>
            <div class="content">
                <div class="panel-group" id="aside-menu">
                    <div class="panel panel-default">
                        <div class="panel-heading" data-toggle="collapse" data-target="#colapse-filter">
                            <h4 class="panel-title">Filters</h4>
                        </div>
                        <div id="colapse-filter" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <?php include('filter.html') ?>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading" data-toggle="collapse" data-target="#collapse-scale">
                            <h4 class="panel-title">Scale</h4>
                        </div>
                        <div id="collapse-scale" class="panel-collapse collapse">
                            <div class="panel-body">
                                <?php include('scale.html') ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <div id="tooltip"></div>
    </body>
</html>