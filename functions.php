<?php

if ( ! function_exists( 'angularpress_setup' ) ) :

function angularpress_setup() {
    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on this one, use a find and replace
     * to change 'angularpress' to the name of your theme in all the template files
     */
    load_theme_textdomain( 'angularpress', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support( 'title-tag' );

    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
     */
    add_theme_support( 'post-thumbnails' );
    set_post_thumbnail_size( 1200, 9999 );

    // This theme uses wp_nav_menu() in two locations.
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'angularpress' ),
        'social'  => __( 'Social Links Menu', 'angularpress' ),
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
    add_editor_style( array( 'css/editor-style.css', angularpress_fonts_url() ) );
}
endif; // angularpress_setup
add_action( 'after_setup_theme', 'angularpress_setup' );

if ( ! function_exists( 'angularpress_fonts_url' ) ) :
    /**
     * Register Google fonts for Twenty Sixteen.
     *
     * Create your own angularpress_fonts_url() function to override in a child theme.
     *
     * @since Angularpress 1.0
     *
     * @return string Google fonts URL for the theme.
     */
    function angularpress_fonts_url() {
        $fonts_url = '';
        $fonts     = array();
        $subsets   = 'latin,latin-ext';

        /* translators: If there are characters in your language that are not supported by Merriweather, translate this to 'off'. Do not translate into your own language. */
        if ( 'off' !== _x( 'on', 'Merriweather font: on or off', 'angularpress' ) ) {
            $fonts[] = 'Merriweather:400,700,900,400italic,700italic,900italic';
        }

        /* translators: If there are characters in your language that are not supported by Montserrat, translate this to 'off'. Do not translate into your own language. */
        if ( 'off' !== _x( 'on', 'Montserrat font: on or off', 'angularpress' ) ) {
            $fonts[] = 'Montserrat:400,700';
        }

        /* translators: If there are characters in your language that are not supported by Inconsolata, translate this to 'off'. Do not translate into your own language. */
        if ( 'off' !== _x( 'on', 'Inconsolata font: on or off', 'angularpress' ) ) {
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

add_action( 'tgmpa_register', 'angularpress_register_required_plugins' );

function angularpress_register_required_plugins() {

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
        'id'           => 'angularpress',                 // Unique ID for hashing notices for multiple instances of TGMPA.
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
  register_nav_menu('Primary',__( 'Header Menu' , 'angularpress'));
}
add_action( 'init', 'register_my_menu' );

function remove_customizer_settings( $wp_customize ) {

    $wp_customize->remove_section( 'static_front_page' );
    $wp_customize->remove_control('blogdescription');
}
add_action( 'customize_register', 'remove_customizer_settings', 20 );

