(function () {
    fileInput.$inject = [];
    function fileInput() {
        var fileTypeRegex = /^file$/i;
        return {
            restrict: 'E',
            require: '?ngModel',
            link: link
        };
        function link(scope, element, attrs, ngModel) {
            if (ngModel && element[0].tagName === 'INPUT' && fileTypeRegex.test(attrs['type'])) {
                element.on('change', function () {
                    console.log("Changed");
                    var input = this;
                    if ('multiple' in attrs) {
                        var files = Array.prototype.map.call(input.files, function (file) { return file; });
                        ngModel.$setViewValue(files);
                    }
                    else {
                        console.log(input.files[0]);
                        ngModel.$setViewValue(input.files[0]);
                    }
                    input.value = '';
                });
            }
        }
    }
    angular.module('angular-file-input', []).directive('input', fileInput);
}());
