# grunt-deserve

> Local development server based on connect/express with reload task, build using tiny-lr for grunt

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-deserve --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-deserve');
```

## The "deserve" task

### Overview
In your project's Gruntfile, add a section named `deserve` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  deserve: {
    default: {
      options: {
        base: './public',
        port: 8080,
        hostname: 'localhost'
      }
    }
  },
  deserve_reload: {
    default: {}
  }
})
```

### Options

#### options.base
Type: `String`
Default value: `.`

Path to serve static files

#### options.port
Type: `Number`
Default value: `8000`

#### options.hostname
Type: `String`
Default value: `'localhost'`

#### options.tinyport
Type: `Number`
Default value: `35729`

Port for tinylr

#### options.keepalive
Type: `Boolean`
Default value: `false`

Keep server up indefinetly

#### options.dev
Type: `String`
Default value: `true`

Log dev info

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
