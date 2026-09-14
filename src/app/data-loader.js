// Ленивая загрузка тяжёлых модулей данных.
// Каждый модуль объявляет глобальные const (CONSPECTS, SEMESTER1_DATA и т.д.)
// и подгружается динамически только когда реально нужен.
(function () {
    'use strict';

    var BUILD = window.BUILD_VERSION || '1';

    var SOURCES = {
        conspects: 'src/data/conspects.js',
        controlWork: 'src/data/control_work.js',
        examTasks: 'src/data/exam_tasks.js',
        physics: 'src/data/physics_ntk_data.js',
        semester1: 'src/data/semester1_data.js',
        integrals: 'src/data/integrals_data.js'
    };

    var registry = Object.create(null);

    function isLoaded(kind) {
        switch (kind) {
            case 'conspects':  return typeof CONSPECTS !== 'undefined';
            case 'controlWork': return typeof typeConfig !== 'undefined';
            case 'examTasks':  return typeof examTasksData !== 'undefined';
            case 'physics':    return typeof PHYSICS_NTK_DATA !== 'undefined' && typeof PHYSICS_THEORY !== 'undefined';
            case 'semester1':  return typeof SEMESTER1_DATA !== 'undefined';
            case 'integrals':  return typeof INTEGRALS_DATA !== 'undefined';
            default:           return true;
        }
    }

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var s = document.createElement('script');
            s.src = src + '?v=' + BUILD;
            s.async = true;
            s.onload = resolve;
            s.onerror = function () { reject(new Error('Не удалось загрузить модуль: ' + src)); };
            document.head.appendChild(s);
        });
    }

    function load(kind) {
        if (isLoaded(kind)) return Promise.resolve();
        if (!SOURCES[kind]) return Promise.resolve();
        if (registry[kind]) return registry[kind];
        registry[kind] = loadScript(SOURCES[kind])
            .then(function () {
                if (!isLoaded(kind)) throw new Error('Модуль не инициализировался: ' + kind);
            })
            .catch(function (err) {
                delete registry[kind];
                throw err;
            });
        return registry[kind];
    }

    function prefetch(kinds) {
        var list = kinds || Object.keys(SOURCES);
        var i = 0;
        function next() {
            if (i >= list.length) return;
            var k = list[i++];
            load(k).catch(function () {});
            setTimeout(next, 180);
        }
        next();
    }

    window.DataLoader = {
        load: load,
        isLoaded: isLoaded,
        prefetch: prefetch,
        SOURCES: SOURCES
    };
})();