<?php
/*
Plugin Name: Tic-tac
Description: A mining clicker game where players extract valuable resources, upgrade their mining speed, and boost their income to build a powerful mining empire.
Version: 0.7
Author: Daniil Karataev
*/

function tic_tac_game_animation_enqueue_scripts() {
    if (is_page_template('template/tic-tac-toe.php')) {
        // game scripts
        wp_enqueue_script( 'tic_tac_animation',             plugins_url('js/game-logic.js', __FILE__), array(), get_file_version('/js/game-logic.js'), null, true);
    }
}
add_action('wp_enqueue_scripts', 'tic_tac_game_animation_enqueue_scripts');

function tic_tac_game_enqueue_styles() {
    if (is_page_template('template/tic-tac-toe.php')) {
        // tikhnic styles
        wp_enqueue_style( 'tic_tac_reset_style',            plugins_url('css/reset.css', __FILE__), array(), get_file_version('/css/reset.css') );
        wp_enqueue_style( 'tic_tac_fonts_style',            plugins_url('css/fonts.css', __FILE__), array(), get_file_version('/css/fonts.css') );

        wp_enqueue_style( 'tic_tac_style',                  plugins_url('style.css', __FILE__), array(), get_file_version('/style.css') );

        // game styles
        wp_enqueue_style( 'tic_tac_game_style',             plugins_url('css/game-style/tic-tac-toe.css', __FILE__), array(), get_file_version('/css/game-style/tic-tac-toe.css') );
    }
}
add_action('wp_enqueue_scripts', 'tic_tac_game_enqueue_styles');

function tic_tac_game_shortcode() {
    ob_start(); ?>
        
        <div class="game-menu">
            <h1>Game Tic Tac Toe</h1>
            <div id="status">Player X's Turn</div>
        </div>
        <div class="wrapper__game-board">
            <div id="game-board" class="game-board"></div>
        </div>
        <button id="restart-button" style="opacity: 0;">Restart Game</button>
        <div id="animation-container"></div>

    <?php return ob_get_clean();
}
add_shortcode('tic_tac_game', 'tic_tac_game_shortcode');

?>