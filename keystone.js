// Next app
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// Require keystone
const keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.init({
 'name': 'Aceinna',
 'auto update': true,
 'session': true,
 'mongo': 'mongodb://127.0.0.1:27017',
 'cloudinary config': 'cloudinary://333779167276662:_8jbSi9FB3sWYrfimcl8VKh34rI@keystone-demo',
 'auth': true,
 'user model': 'User',
 'cookie secret': 'aceinna-cms',
});

// Load your project's Models
keystone.import('models');

// Start Next app
app.prepare()
	.then(() => {


keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});
	// Load your project's Routes
	keystone.set('routes', require('./routes')(app));

	// Configure the navigation bar in Keystone's Admin UI
	keystone.set('nav', {
		posts: ['posts', 'post-categories'],
		users: 'users'
	});

	keystone.start();
});

