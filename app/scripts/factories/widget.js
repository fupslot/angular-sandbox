angular.module('MyApp')
.provider('Widget', function () {

    var globalOptions = {},
        
        defaults = {},
        
        defaultModel = {
            config: {},
            base: {
                title: 'New widget',
                current_ds: null
            },
            props: {
                queryConfigs: {},
                viewerPerm: {}
            }
        };
    // The `options({})` allows global configuration of widgets made out of this type in the application.
    //
    // angular.module('App', [], function($MyClassProvider){
    //   $MyClassProvider.options({modalSize: {width: 200, heigth: 200}});
    // });
    this.options = function(value){
        globalOptions = value;
    };

    this.$get = 
            ['$log', 'Events', 'Extend', 'WidgetSDK', 'Attributable',
    function ($log,   Events,   Extend,   WidgetSDK,   Attributable) {

        var _SetWatchFunc = function () {
            var _scope = this.__privates__.scope, self = this;

            var _watch = function (scope) {
                var self = this, scope = scope;
                return function (key, funcName) {
                    if (angular.isUndefined(self.className)) {
                        $log.error('WidgetSDK -> Widget: Class name is undefined');
                        return angular.noop;
                    }
                    return scope.$watch(self.className + '.attributes.' + key, funcName);
                }
            };

            self.watch = _watch.call(self, _scope);
        };

        /*
            this.cache.set('dataTable', [object]);
            this.cache.get('dataTable') --> [object]
            this.cache.remove(dataTable) -x-> [object]
            this.cache.clean();
        */
        var _SetCacheFunc = function () {
            var _cache = {};

            this.cache = {
                get: function (key) {
                    return _cache[key];
                },
                
                set: function (key, value) {
                    if (angular.isDefined(value)) {
                        _cache[key] = value;
                    }
                    return _cache[key];
                },

                remove: function (key) {
                    if (angular.isDefined(_cache[key])) {
                        delete _cache[key];
                    }
                },

                clean: function () {
                    var self = this;
                    var keys = Object.keys(_cache);
                    angular.forEach(keys, function (key) {
                        self.remove(key);
                    });
                }
            };
        };

        var _SetBindFunc = function () {
            var self = this, scope = this.__privates__.scope, watchers;
            
            self.__watchers__ = watchers = {};

            var _bind = function (attr) {
                if (angular.isDefined(watchers[attr])) { return; }

                var watcher = function (value, previous) {
                    if (angular.equals(value, previous)) { return; }

                    console.log(attr + ' --> ' + value);
                    
                    var validators = self.__validators__[attr];
                    if (angular.isUndefined(validators)) { return; }

                    for (var i = 0, l = validators.length; i < l; i++) {
                        var cancel = function (withValue) {
                            i = l; // prevent future itterations

                            if (angular.isUndefined(withValue)) { withValue = previous; }

                            watchers[attr].unwatch();
                            scope.attrs[attr] = withValue;
                            watchers[attr].unwatch = scope.$watch('attrs.' + attr, watcher);
                            console.log('canceled');
                        };

                        var validator = validators[i];
                        validator.call(self, value, previous, cancel);
                    }

                };
// debugger
                watchers[attr] = {
                    name: attr,
                    unwatch: scope.$watch('attrs.' + attr, watcher)
                };
            };

            var unbind = function (attr) {
                if (angular.isDefined(watchers[attr])) {
                    watchers[attr].unwatch();
                    delete watchers[attr];
                }
            };

            this.bind   = _bind;
            this.unbind = unbind;
        }

        var _SetValidateFunc = function () {
            var self = this, validators;
            
            self.__validators__ = validators = {};

            var validate = function (attr, validator) {
                if (!angular.isString(attr)) {
                    throw new Error('Attribute name must be a string, and it\'s ' + typeof attr);
                }

                if (!angular.isFunction(validator)) {
                    throw new Error('A validator must be a function, and it\'s ' + typeof validator);
                }

                if (angular.isUndefined(validators[attr])) {
                    validators[attr] = [];
                }
                validators[attr].push(validator);
            };

            this.validate = validate;
        };

        var _SetMergeFunc = function () {
            var self = this, scope = this.__privates__.scope;

            var merge = function () {
                var attrs = scope.attrs;
                self.set(attrs, true);
                
            }
            this._mergeAttributes = merge;
        };

        var _SetPrivates = function (scope, el) {
            var scope = scope, el = el;
            
            this.__privates__ = {
                scope: scope,
                el: el
            };
        };

        var Widget = function(className, options, model) {
            var self = this;

            this.className = className;
            this.attributes = {};

            var options = this.options = angular.extend({}, defaults, globalOptions, options);
            
            this.__model__ = _.defaults({}, defaultModel, model);
            var model = this.__model__;

            // pulls uniq tabs which may be defined by a developer
            var _tabs = _.pull(_.uniq(_.result(this, 'tabs') || []), 'query');
            var _defaults = _.result(this, 'defaults');

            // merges default configuration defined by developer and configuration
            // from __model__.config object per each tab
            angular.forEach(_tabs, function (tab) {
                model.config[tab] = _.defaults({}, model.config[tab], _.result(_defaults, tab));
                angular.copy(model.config[tab], (self.attributes[tab] = {}));
                delete _defaults[tab];
            });
            
            // attach tabs to a model, we'll need them in save
            this.__tabs__ = _tabs;

            var attrs = _.defaults({}, _defaults);

            this.set(attrs);

            var scope = this.options.scope;
            // Sets links to private objects like $scope or $element for internal use only
            // these objects are available throw __privates__ and not pleased for third-party delevelopers to use
            _SetPrivates.call(this, scope, this.options.el);
            // after all functions have been binded to widget object 
            // we dont need scope in options any more
            delete this.options.scope;
            delete this.options.el;

            _SetWatchFunc.call(this);
            _SetBindFunc.call(this);
            _SetCacheFunc.call(this);
            _SetValidateFunc.call(this);
            _SetMergeFunc.call(this);

            // attach attributes to the scope
            angular.copy(this.attributes, (scope.attrs = {}));

            this.initialize.apply(this, arguments);
        };

        _.extend(Widget.prototype, Events, WidgetSDK, Attributable, {
            // Initialize is an empty function by default. Override it with your own
            // initialization logic.
            initialize: angular.noop,
            disabled: false,

            disable: function () {
                if (!this.disabled) {
                    this.trigger('onDisabled');
                    this.disabled = !this.disabled;
                }
            },

            enable: function () {
                if (this.disabled) {
                    this.trigger('onEnabled');
                    this.disabled = !this.disabled;
                }
            },

            save: function () {
                // this._mergeAttributes();
                this.trigger('onSave', this.attributes);
                this.trigger('draw');
            }
        });

        Widget.extend = Extend;

        return Widget;
    }];
}); 