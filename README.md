# grunt-roku-deploy

> Deploy to a Roku device

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-roku-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-roku-deploy');
```

## The "roku_deploy" task

### Overview
In your project's Gruntfile, add a section named `roku_deploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  roku_deploy: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.address
Type: `String`
Default value: `'localhost'`

The local ip address of the Roku device. (e.g. 192.168.1.2)

#### options.username
Type: `String`
Default value: `'rokudev'`

The username of the Roku device. (e.g. rokudev)


#### options.password
Type: `String`
Default value: `''`

The password for the development user. (e.g. 1234)

### Usage Examples

```js
grunt.initConfig({
  roku_deploy: {
    options: {
      address: "192.168.1.2",
      username: "rokudev",
      password: "12345"
    },
    deploy: {
      files: {src:'path/to/deployment.zip'}
    }
  }
});
```

## Contributing
Please report issues to the Github repository.

## Release History
_(Nothing yet)_
