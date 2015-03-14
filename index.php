<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org" id="myApp" ng-app="myApp">
<head>
<meta charset="UTF-8">
<!--[if lte IE 7]>
      <script src="//cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"
      <script>
  JSON.stringify({"Hello": 123});
  // => '{"Hello":123}'
  JSON.parse("[[1, 2, 3], 1, 2, 3, 4]", function (key, value) {
    if (typeof value == "number") {
      value = value % 2 ? "Odd" : "Even";
    }
    return value;
  });
  // => [["Odd", "Even", "Odd"], "Odd", "Even", "Odd", "Even"]
</script>
    <![endif]-->
<title><?php bloginfo('name'); ?></title>

  <!--
  <link data-require="bootstrap-css@2.3.2" data-semver="2.3.2" rel="stylesheet" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" />
  -->
  <script src="<?php echo get_template_directory_uri(); ?>/js/angular.min.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/js/angular-sanitize.min.js"></script>

  <script src="<?php echo get_template_directory_uri(); ?>/js/ui-bootstrap-tpls.min.js"></script>
  <!-- angular -->
  <script src="<?php echo get_template_directory_uri(); ?>/js/angular-route.min.js"></script>
  <script data-require="angular-resource@*" data-semver="1.2.14" src="<?php echo get_template_directory_uri(); ?>/js/angular-resource.js"></script>
   <script src="<?php echo get_template_directory_uri(); ?>/js/angular-animate.min.js"></script>
<!-- loadingbar -->
<script src="<?php echo get_template_directory_uri(); ?>/js/angular-loading-bar/src/loading-bar.js"></script>
<link href='<?php echo get_template_directory_uri(); ?>/js/angular-loading-bar/src/loading-bar.css' rel='stylesheet' />
<!-- loadingbar -->
    <link href="<?php echo get_template_directory_uri(); ?>/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="<?php echo get_template_directory_uri(); ?>/css/prettify.css" rel="stylesheet">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css" />
  <script src="<?php echo get_template_directory_uri(); ?>/js/controller.js"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/js/app.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
</head>

  <body>
  <!-- MENU BOOTSTRAP caricato dinamicamente da WP -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><?php bloginfo('name'); ?></a>
        </div>
        <div class="collapse navbar-collapse">
   


          <ul class="nav navbar-nav json-menu">

                        </ul>
        

   

        </div><!--/.nav-collapse -->
      </div>
    </div>
    <!-- MENU BOOTSTRAP caricato dinamicamente da WP fine-->
 
<div ng-view>


  <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="<?php echo get_template_directory_uri(); ?>/js/jquery.min.js"></script>  
    <script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
     <script src="<?php echo get_template_directory_uri(); ?>/js/json-menu.js"></script>
</div>
    
  </body>
</html>