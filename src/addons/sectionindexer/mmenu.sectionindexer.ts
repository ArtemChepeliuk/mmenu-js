Mmenu.addons.sectionIndexer = function(
	this : Mmenu
) {
	var opts = this.opts.sectionIndexer;


	//	Extend shorthand options
	if ( typeof opts == 'boolean' )
	{
		(opts as mmLooseObject) = {
			add: opts
		};
	}
	if ( typeof opts != 'object' )
	{
		(opts as mmLooseObject) = {};
	}
	//	/Extend shorthand options


	this.opts.sectionIndexer = Mmenu.extend( opts, Mmenu.options.sectionIndexer );


	if ( !opts.add )
	{
		return;
	}


	this.bind( 'initPanels:after', (
		panels	: HTMLElement[]
	) => {

		var $panels = Mmenu.$(panels);

		//	Set the panel(s)
		if ( opts.addTo != 'panels' )
		{
			//	TODO addTo kan ook een HTML element zijn?
			panels = Mmenu.DOM.find( this.node.menu, opts.addTo )
				.filter( panel => panel.matches( '.mm-panel' ) );
		}

		panels.forEach(( panel ) => {
			Mmenu.DOM.find( panel, '.mm-listitem_divider' )
				.forEach(( listitem ) => {
					listitem.closest( '.mm-panel' ).classList.add( 'mm-panel_has-sectionindexer' );
				});
		});


		//	Add the indexer, only if it does not allready excists
		if ( !this.node.indx )
		{
			let buttons = '';
			'abcdefghijklmnopqrstuvwxyz'.split( '' ).forEach(( letter ) => {
				buttons += '<a href="' + letter + '">' + letter + '</a>';
			});

			let indexer = Mmenu.DOM.create( 'div.mm-sectionindexer' );
				indexer.innerHTML = buttons;

			this.node.menu.prepend( indexer );
			this.node.indx = indexer;

			//	Prevent default behavior when clicking an anchor
			this.node.indx.addEventListener( 'click', ( evnt ) => {
				var anchor = (evnt.target as HTMLElement)

				if ( anchor.matches( 'a' ) )
				{
					evnt.preventDefault();
				}
			});

			//	Scroll onMouseOver
			Mmenu.$(this.node.indx)
				.on( 'mouseover.mm-sectionIndexer touchstart.mm-sectionIndexer', 'a', ( e ) => {
					var lttr  = Mmenu.$(e.currentTarget).html(),
						$panl = Mmenu.$(this.node.pnls).children( '.mm-panel_opened' ),
						$list = $panl.find( '.mm-listview' );

					var newTop = -1,
						oldTop = $panl.scrollTop();

					$panl.scrollTop( 0 );
					$list
						.children( '.mm-listitem_divider' )
						.not( '.mm-hidden' )
						.each(
							( i, elem ) => {
								if ( newTop < 0 &&
									lttr == elem.innerText.slice( 0, 1 ).toLowerCase()
								) {
									newTop = Mmenu.$(elem).position().top;
								}
							}
						);

					$panl.scrollTop( newTop > -1 ? newTop : oldTop );
				});
		}


		//	Show or hide the indexer
		function update(
			this	 : Mmenu,
			panel	?: HTMLElement
		) {
			panel = panel || Mmenu.DOM.children( this.node.pnls, '.mm-panel_opened' )[ 0 ];
			this.node.menu.classList[ panel.matches( '.mm-panel_has-sectionindexer' ) ? 'add' : 'remove' ]( 'mm-menu_has-sectionindexer' );
		};

		this.bind( 'openPanel:start', 	update );
		this.bind( 'initPanels:after',	update ); // TODO panel argument is an array
	});
};


//	Default options and configuration.
Mmenu.options.sectionIndexer = {
	add		: false,
	addTo	: 'panels'
};