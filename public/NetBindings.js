require(['kalm', 'kalm-websocket'], function(Kalm, WS) {
	Kalm.adapters.register('ws', WS);

	window.Net = new Kalm.Client({
		port: 9000,
		adapter: 'ws'
	});
});