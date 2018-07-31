<?php

namespace RRZE\Elements\Alert;

defined('ABSPATH') || exit;

class Alert {

    public function __construct() {
        add_shortcode('alert', [$this, 'shortcode_alert']);
    }

    public function shortcode_alert($atts, $content = '') {
        extract(shortcode_atts([
            'style' => '',
            'color' => '',
            'border_color' => '',
            'font' => 'dark'
        ], $atts));

        $style = (in_array($style, array('success', 'info', 'warning', 'danger'))) ? ' alert-' . $style : '';
        $color = ((substr($color, 0, 1) == '#') && (in_array(strlen($color), [4, 7]))) ? 'background-color:' . $color . ';' : '';
        $border_color = ((substr($border_color, 0, 1) == '#') && (in_array(strlen($border_color), [4, 7]))) ? ' border:1px solid' . $border_color . ';' : '';
        $font = ($font == 'light') ? ' color: #fff;letter-spacing: 0.03em;' : '';

        if ('' != $color || '' != $border_color || '' != $font) {
            $style = '';
        }

        $output = '<div class="alert' . $style . '" style="' . $color . $border_color . $font . '">' . do_shortcode(($content)) . '</div>';

        wp_enqueue_style('fontawesome');
        wp_enqueue_style('rrze-elements');

        return $output;
    }

}