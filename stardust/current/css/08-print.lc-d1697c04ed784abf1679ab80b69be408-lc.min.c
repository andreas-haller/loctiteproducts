@media print{heliux-header,heliux-notifications,heliux-breadcrumb,heliux-backtotop,heliux-footer,heliux-inpagenavigation,heliux-calltoaction:has(.calltoaction__print),heliux-nextbestexperience,heliux-bottomnavigation,heliux-video>*:not(heliux-print-only-placeholder),heliux-hotspot>*:not(heliux-print-only-placeholder),heliux-mosaic>*:not(heliux-print-only-placeholder),.cookiebanner,*:not(html,body,.root,.root *,heliux-print-only-placeholder *){display:none !important}
body{-webkit-print-color-adjust:exact}
.print-hide{display:none !important}
.print-only{display:block !important}
.print-break-before-always{-moz-column-break-before:page;break-before:page}
.print-break-inside-avoid{-moz-column-break-inside:avoid;break-inside:avoid}
picture.image__screenOnly:has(+.image__printOnly){content-visibility:hidden}
picture.image__printOnly{content-visibility:visible}
heliux-print-only-placeholder{content-visibility:visible}
.columncontrol.print-desktop-columns heliux-grid{grid-template-columns:var(--grid-template-columns);grid-template-rows:var(--grid-template-rows)}
}