Mmenu.addons.navbars=function(){var m=this,n=this.opts.navbars;if(void 0!==n){n instanceof Array||(n=[n]);var c={},v={};n.length&&(n.forEach(function(n){"boolean"==typeof n&&n&&(n={}),"object"!=typeof n&&(n={}),void 0===n.content&&(n.content=["prev","title"]),n.content instanceof Array||(n.content=[n.content]);var a=Mmenu.DOM.create("div.mm-navbar"),t=n.height;"number"!=typeof t?t=1:1<(t=Math.min(4,Math.max(1,t)))&&a.classList.add("mm-navbar_size-"+t);var e=n.position;"bottom"!==e&&(e="top"),c[e]||(c[e]=0),c[e]+=t,v[e]||(v[e]=Mmenu.DOM.create("div.mm-navbars_"+e)),v[e].append(a);for(var o=0,r=n.content.length;o<r;o++){var s="string"==typeof n.content[o]&&Mmenu.addons.navbars[n.content[o]]||null;s?s.call(m,a):((s=n.content[o])instanceof Mmenu.$||(s=Mmenu.$(n.content[o])),a.append(s))}a.querySelector(".mm-navbar__btn")&&a.classList.add("mm-navbar_has-btns");var i="string"==typeof n.type&&Mmenu.addons.navbars[n.type]||null;i&&i.call(m,a)}),this.bind("initMenu:after",function(){for(var n in v)m.node.menu.classList.add("mm-menu_navbar_"+n+"-"+c[n]),m.node.menu["bottom"==n?"append":"prepend"](v[n])}))}},Mmenu.options.navbars=[],Mmenu.configs.navbars={breadcrumbs:{separator:"/",removeFirst:!1}},Mmenu.configs.classNames.navbars={};