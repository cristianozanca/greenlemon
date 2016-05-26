<?php

if ( ! function_exists( 'greenlemon_setup' ) ) :

function greenlemon_setup() {


  function greenlemon_custom_scripts(){

      // Register and Enqueue a Stylesheet
      // get_template_directory_uri will look up parent theme location
      wp_register_style( 'bootstrap-responsive', get_template_directory_uri() . '/css/bootstrap-responsive.css');
      wp_enqueue_style( 'bootstrap-responsive' );
      wp_register_style( 'bootstrap.min', get_template_directory_uri() . '/css/bootstrap.min.css');
      wp_enqueue_style( 'bootstrap.min' );
      wp_register_style( 'prettify', get_template_directory_uri() . '/css/prettify.css');
      wp_enqueue_style( 'prettify' );
      wp_register_style( 'style', get_template_directory_uri() . '/style.css');
      wp_enqueue_style( 'style' );
      wp_register_style( 'loading-bar.css', get_template_directory_uri() . '/js/angular-loading-bar/src/loading-bar.css');
      wp_enqueue_style( 'loading-bar.css' );

      // Register and Enqueue a Script
      // get_stylesheet_directory_uri will look up child theme location
      wp_register_script( 'jquery.min', get_stylesheet_directory_uri() . '/js/jquery.min.js', array());
      wp_enqueue_script( 'jquery.min' );
      wp_register_script( 'bootstrap.min.js', get_stylesheet_directory_uri() . '/js/bootstrap.min.js', array());
      wp_enqueue_script( 'bootstrap.min.js' );
      wp_register_script( 'json-menu', get_stylesheet_directory_uri() . '/js/json-menu.js', array());
      wp_enqueue_script( 'json-menu' );
      wp_register_script( 'angular.min', get_stylesheet_directory_uri() . '/js/angular.min.js', array());
      wp_enqueue_script( 'angular.min' );
      wp_register_script( 'angular-sanitize.min', get_stylesheet_directory_uri() . '/js/angular-sanitize.min.js', array());
      wp_enqueue_script( 'angular-sanitize.min' );
      wp_register_script( 'ui-bootstrap-tpls.min', get_stylesheet_directory_uri() . '/js/ui-bootstrap-tpls.min.js', array());
      wp_enqueue_script( 'ui-bootstrap-tpls.min' );
      wp_register_script( 'angular-route.min', get_stylesheet_directory_uri() . '/js/angular-route.min.js', array());
      wp_enqueue_script( 'angular-route.min' );
      wp_register_script( 'angular-resource', get_stylesheet_directory_uri() . '/js/angular-resource.js', array());
      wp_enqueue_script( 'angular-resource' );
      wp_register_script( 'angular-animate.min', get_stylesheet_directory_uri() . '/js/angular-animate.min.js', array());
      wp_enqueue_script( 'angular-animate.min' );
      wp_register_script( 'controller', get_stylesheet_directory_uri() . '/js/controller.js', array());
      wp_enqueue_script( 'controller' );
      wp_register_script( 'app', get_stylesheet_directory_uri() . '/js/app.js', array());
      wp_enqueue_script( 'app' );
      wp_register_script( 'loading-bar', get_stylesheet_directory_uri() . '/js/angular-loading-bar/src/loading-bar.js', array());
      wp_enqueue_script( 'loading-bar' );


  }

  add_action('wp_enqueue_scripts', 'greenlemon_custom_scripts');

    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on this one, use a find and replace
     * to change 'greenlemon' to the name of your theme in all the template files
     */
    load_theme_textdomain( 'greenlemon', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support( 'title-tag' );

    $args = array(
    	'flex-width'    => true,
    	'width'         => 980,
    	'flex-height'    => true,
    	'height'        => 200,
    	'default-image' => get_template_directory_uri() . '/img/greenlemon-theme.jpg',
      'uploads'       => true,
    );
    add_theme_support( 'custom-header', $args );
    register_default_headers( array(
    	'default-image' => array(
    		'url'           => get_template_directory_uri() . '/img/greenlemon-theme.jpg',
    		'thumbnail_url' => get_template_directory_uri() . '/img/greenlemon-theme.jpg',
    		'description'   => __( 'Default-image', 'greenlemon' )
    	)
    ) );


    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
     */
    add_theme_support( 'post-thumbnails' );
    set_post_thumbnail_size( 1200, 9999 );

    // This theme uses wp_nav_menu() in two locations.
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'greenlemon' ),
        'social'  => __( 'Social Links Menu', 'greenlemon' ),
    ) );

    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    /*
     * Enable support for Post Formats.
     *
     * See: https://codex.wordpress.org/Post_Formats
     */
    add_theme_support( 'post-formats', array(
        'aside',
        'image',
        'video',
        'quote',
        'link',
        'gallery',
        'status',
        'audio',
        'chat',
    ) );

    /*
     * This theme styles the visual editor to resemble the theme style,
     * specifically font, colors, icons, and column width.
     */
    add_editor_style( array( 'css/editor-style.css', greenlemon_fonts_url() ) );
}
endif; // greenlemon_setup
add_action( 'after_setup_theme', 'greenlemon_setup' );

if ( ! function_exists( 'greenlemon_fonts_url' ) ) :
    /**
     * Register Google fonts for Twenty Sixteen.
     *
     * Create your own greenlemon_fonts_url() function to override in a child theme.
     *
     * @since greenlemon 1.0
     *
     * @return string Google fonts URL for the theme.
     */
    function greenlemon_fonts_url() {
        $fonts_url = '';
        $fonts     = array();
        $subsets   = 'latin,latin-ext';

        /* translators: If there are characters in your language that are not supported by Merriweather, translate this to 'off'. Do not translate into your own language. */
        if ( 'off' !== _x( 'on', 'Merriweather font: on or off', 'greenlemon' ) ) {
            $fonts[] = 'Merriweather:400,700,900,400italic,700italic,900italic';
        }

        /* translators: If there are characters in your language that are not supported by Montserrat, translate this to 'off'. Do not translate into your own language. */
        if ( 'off' !== _x( 'on', 'Montserrat font: on or off', 'greenlemon' ) ) {
            $fonts[] = 'Montserrat:400,700';
        }

        /* translators: If there are characters in your language that are not supported by Inconsolata, translate this to 'off'. Do not translate into your own language. */
        if ( 'off' !== _x( 'on', 'Inconsolata font: on or off', 'greenlemon' ) ) {
            $fonts[] = 'Inconsolata:400';
        }

        if ( $fonts ) {
            $fonts_url = add_query_arg( array(
                'family' => urlencode( implode( '|', $fonts ) ),
                'subset' => urlencode( $subsets ),
            ), 'https://fonts.googleapis.com/css' );
        }

        return $fonts_url;
    }
endif;

/**
 * Include the TGM_Plugin_Activation class.
 */
require_once get_template_directory() . '/class/class-tgm-plugin-activation.php';

add_action( 'tgmpa_register', 'greenlemon_register_required_plugins' );

function greenlemon_register_required_plugins() {

    $plugins = array(
        array(
            'name'      => 'WP API MENUS',
            'slug'      => 'wp-api-menus',
            'required'  => true,
        ),
        array(
            'name'      => 'WP-API',
            'slug'      => 'json-rest-api',
            'required'  => true,
        ),

    );

    $config = array(
        'id'           => 'greenlemon',                 // Unique ID for hashing notices for multiple instances of TGMPA.
        'default_path' => '',                      // Default absolute path to bundled plugins.
        'menu'         => 'tgmpa-install-plugins', // Menu slug.
        'has_notices'  => true,                    // Show admin notices or not.
        'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
        'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
        'is_automatic' => false,                   // Automatically activate plugins after installation or not.
        'message'      => '',                      // Message to output right before the plugins table.
    );

    tgmpa( $plugins, $config );

}

if ( ! isset( $content_width ) ) {
    $content_width = 600;
}


function register_my_menu() {
  register_nav_menu('Primary',__( 'Header Menu' , 'greenlemon'));
}
add_action( 'init', 'register_my_menu' );

function remove_customizer_settings( $wp_customize ) {

    $wp_customize->remove_section( 'static_front_page' );
    $wp_customize->remove_control('blogdescription');
}
add_action( 'customize_register', 'remove_customizer_settings', 20 );
