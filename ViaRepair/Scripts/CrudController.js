(function () {
    "use strict";
    angular
        .module("crudApp", [])
        .controller('crudController', crudController);

    crudController.$inject = ['crudService', '$scope', '$window'];

    function crudController(crudService, $scope, $window) {

        var vm = this;
        vm.crudService = crudService;
        vm.currentItems = [];
        vm.itemsPerPage = 5;
        vm.numberOfPages = [];
        vm.items = [];
        vm.currentPage = 1;
        vm.showIt = false;  //SHOWS/HIDES FORM
        vm.isUpdate = null;
        vm.useThis = null;
        vm.isNew = null;
        vm.editForm = null;
        vm.item = null;
        vm.addHere = null;
        vm.pagination = _pagination;
        vm.cancel = _cancel;
        vm.request = _request;
        vm.select = _select;
        vm.createNew = _createNew;
        vm.hasValidationError = _hasValidationError;
        vm.showValidationError = _showValidationError;
        vm.delete = _delete;
        vm.plusOne = _plusOne;
        vm.minusOne = _minusOne;
        vm.remove = _remove;
        //vm.submitDoc = _submitDoc;
        vm.$onInit = _init;
        vm.files = [];
        vm.close = _close;
        vm.upload = _upload;
        vm.ActivityId = null;
        vm.listDocs = false;
        vm.documents = [];
        vm.$window = $window;
        vm.activityListId = null;
        //$scope.files = [];
        /* OPTIONS FOR SUMMERNOTE DECLARED HERE*/
        vm.options = {
            focus: true,
            toolbar: [
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['view', ['fullscreen']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']]
            ]
        };

        function _init() {
            vm.crudService.getAll()
                .then(_getAllSuccess, _getAllError);
            vm.showIt = false;
        }

        function _upload() {

            if (vm.files.length > 0) {
                angular.forEach(vm.files, function (file, key) {

                    file.item.activityId = vm.ActivityId;
                    file.item.fileName = file.name;
                    file.item.size = file.size / 1024;
                    file.item.type = file.type;
                    console.log("upload file " + key);
                    console.log(file);
                    vm.activityFileService.post(file.file, file.item)
                        .then(_uploadSuccess, _uploadError);

                });
            }

        }
        function _uploadSuccess(data) {
            console.log("upload Success");
        }

        function _uploadError(error) {
            if (error && error.message) {
                $.growl({
                    message: 'Failed to upload docs to database'
                }, {
                        element: 'body',
                        allow_dismiss: true,
                        offset: { x: 20, y: 85 },
                        spacing: 10,
                        z_index: 1031,
                        delay: 3000,
                        url_target: '_blank',
                        mouse_over: false
                    });
            }
        }

        function _remove(index) {
            var files = [];
            angular.forEach(vm.files, function (file, key) {

                if (index !== key) {
                    files.push(file);
                }
                vm.files = files;
            });
        }

        function _deleteFile(id) {
            vm.crudService.delete(id)
                .then(_deleteDocSuccess, _deleteDocFailed);

        }

        function _getByActivityIdSuccess(data) {
            console.log("get By ActivityId Success");
            console.log(data);
            vm.documents = [];
            vm.documents = data.items;
            if (vm.documents !== null) {
                vm.listDocs = true;
            }
            else {
                vm.listDocs = false;
                $.growl({
                    message: 'There is no Document associated with this activity'
                }, {
                        type: 'warning',
                        element: 'body',
                        allow_dismiss: true,
                        offset: { x: 20, y: 85 },
                        spacing: 10,
                        z_index: 1031,
                        delay: 2000,
                        url_target: '_blank',
                        mouse_over: false
                    });
            }

        }




        function _getByActivityIdFailed(error) {
            console.log("getByActivityIdFailed");
        }

        function _deleteDocSuccess(data) {
            $.growl({
                message: 'Delete the Document Successfully'
            }, {
                    type: 'success',
                    element: 'body',
                    allow_dismiss: true,
                    offset: { x: 20, y: 85 },
                    spacing: 10,
                    z_index: 1031,
                    delay: 2000,
                    url_target: '_blank',
                    mouse_over: false
                });

        }

        function _deleteDocFailed(error) {
            console.log("delete Doc Failed");
        }

        function _close() {
            vm.files = [];
        }

        function _getAllSuccess(data) {
            if (data.Items.length > 0) {
                vm.items = data.Items;
                _howManyPages();
            }
            
        }

        function _getAllError(error) {
            if (error && error.message) {
                $.growl({
                    message: 'Failed to get info from database'
                }, {
                        element: 'body',
                        allow_dismiss: true,
                        offset: { x: 20, y: 85 },
                        spacing: 10,
                        z_index: 1031,
                        delay: 2000,
                        url_target: '_blank',
                        mouse_over: false
                    });
            }
        }

        function _pagination(itemArray, currentPage, itemsPerPage) {
            vm.currentItems = [];
            currentPage = currentPage || 1;
            itemsPerPage = itemsPerPage || 1000000;
            var start = (currentPage - 1) * itemsPerPage;
            var end = start + itemsPerPage * 1;
            vm.currentItems = itemArray.slice(start, end);
        }

        function _howManyPages() {
            vm.pages = Math.ceil(vm.items.length / vm.itemsPerPage);
            _makePages();
        }

        function _makePages() {
            vm.numberOfPages = [];
            for (var y = 2; y < vm.pages + 1; y++) {
                vm.numberOfPages.push(y);
            }
            _pagination(vm.items, vm.currentPage, vm.itemsPerPage);
        }

        function _plusOne() {
            if (vm.currentPage < (vm.items.length / vm.itemsPerPage)) {
                vm.currentPage += 1;
                _pagination(vm.items, vm.currentPage, vm.itemsPerPage);
            }
        }

        function _minusOne() {
            if (vm.currentPage > 1) {
                vm.currentPage -= 1;
                _pagination(vm.items, vm.currentPage, vm.itemsPerPage);
            }
        }

        function _request() {

            if (vm.editForm.$invalid) {
                return;
            }
            else if (vm.item.id) {

                if (vm.item.materials === null) {
                    vm.item.materials = "";
                }
                vm.crudService.update(vm.item)
                    .then(_updateSuccess, _updateError);
            }
            else {
                if (vm.item.materials === null) {
                    vm.item.materials = "";
                }
                vm.crudService.postTwo(vm.item)
                    .then(_postSuccess, _postError);
            }
        }

        function _delete(id) {
            console.log(id);
            swal({
                title: "Are you sure?",
                text: "Activity will be deleted forever!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "red",
                confirmButtonText: "DELETE",
                cancelButtonColor: "blue"
            })
                .then
                (function (isConfirm) {
                    if (isConfirm) {
                        vm.crudService.delete(id)
                            .then(_deleteSuccess, _deleteError);
                    }
                });
        }

        function _deleteSuccess(data) {
            vm.editForm.$setPristine();
            vm.showIt = false;
            swal("Deleted!", "Activity has been deleted.", "success");
            vm.items = [];
            //vm.activityService.getAll()
            //    .then(_getAllSuccess, _getAllError);
            vm.$onInit();
        }

        function _deleteError(error) {
            if (error && error.message) {
                $.growl({
                    message: 'Failed to get info from database'
                }, {
                        element: 'body',
                        allow_dismiss: true,
                        offset: { x: 20, y: 85 },
                        spacing: 10,
                        z_index: 1031,
                        delay: 2000,
                        url_target: '_blank',
                        mouse_over: false
                    });
            }
        }

        function _postSuccess(data) {
            if (data) {
                vm.item.id = data.item;
                vm.items.push(vm.item);
                vm.ActivityId = vm.item.id;

                if (vm.files[0]) {
                    vm.upload();
                }

            }
            console.log(data);
            vm.editForm.$setPristine();
            vm.showIt = false;
            $.growl({
                message: 'Activity Posted Successfully'
            }, {
                    element: 'body',
                    type: 'success',
                    allow_dismiss: true,
                    offset: { x: 20, y: 85 },
                    spacing: 10,
                    z_index: 1031,
                    delay: 2000,
                    url_target: '_blank',
                    mouse_over: false
                });
            vm.$onInit();
        }

        function _postError(error) {
            if (error && error.message) {
                $.growl({
                    message: 'Failed to get info from database'
                }, {
                        element: 'body',
                        allow_dismiss: true,
                        offset: { x: 20, y: 85 },
                        spacing: 10,
                        z_index: 1031,
                        delay: 2000,
                        url_target: '_blank',
                        mouse_over: false
                    });
            }
        }

        function _updateSuccess(data) {
            vm.editForm.$setPristine();
            vm.showIt = false;
            vm.upload();
            $.growl({
                message: 'Activity Updated Successfully'
            }, {
                    element: 'body',
                    type: 'success',
                    allow_dismiss: true,
                    offset: { x: 20, y: 85 },
                    spacing: 10,
                    z_index: 1031,
                    delay: 2000,
                    url_target: '_blank',
                    mouse_over: false
                });
        }

        function _updateError(error) {
            if (error && error.message) {
                $.growl({
                    message: 'Failed to get info from database'
                }, {
                        element: 'body',
                        allow_dismiss: true,
                        offset: { x: 20, y: 85 },
                        spacing: 10,
                        z_index: 1031,
                        delay: 2000,
                        url_target: '_blank',
                        mouse_over: false
                    });
            }
        }

        function _createNew() {
            vm.item = {};
            vm.showIt = true;
            vm.isUpdate = null;
            vm.isNew = {};
        }

        function _cancel() {
            vm.showIt = false;
            vm.editForm.$setPristine();
        }

        function _select(item, index) {
            // Keep track of the position in vm.items of
            // the item we will be editing
            vm.addHere += 1;
            vm.itemIndex = index;
            vm.isNew = null;
            vm.isUpdate = {};
            vm.showIt = true;
            // get a fresh copy of the object to be edited from the database.
            vm.item = vm.currentItems[index];
            vm.editForm.$Dirty;
            vm.ActivityId = vm.item.id;
            vm.listDocs = false;
        }

        function _hasValidationError(propertyName) {
            return (vm.editForm.$submitted || vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$invalid;
        }

        function _showValidationError(propertyName, ruleName) {
            return (vm.editForm.$submitted || vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$error[ruleName];
        }
    }


})();

(function () {
    "use strict";
    angular
        .module("crudApp")
        .factory('crudService', crudService);
    crudService.$inject = ['$http', '$q'];

    function crudService($http, $q) {
        return {
            postTwo: _postTwo,
            getAll: _getAll,
            update: _update,
            delete: _delete
        };

        function _delete(data) {
            var settings = {
                url: '/api/person/' + data,
                method: 'DELETE',
                cache: 'false',
                withCredentials: true
            };
            return $http(settings)
                .then(_deleteComplete, _deleteFailed);
        }

        function _deleteComplete(response) {
            return response.data;
        }

        function _deleteFailed(error) {
            var msg = 'Failed to Post';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _postTwo(data) {
            var settings = {
                url: '/api/person',
                method: 'POST',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(data),
                withCredentials: true
            };
            return $http(settings)
                .then(_postTwoComplete, _postTwoFailed);
        }

        function _postTwoComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _postTwoFailed(error) {
            var msg = 'Failed To Post';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _update(data) {
            var settings = {
                url: '/api/person/' + data.id,
                method: 'PUT',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(data),
                withCredentials: true
            };
            return $http(settings)
                .then(_updateComplete, _updateFailed);
        }

        function _updateComplete(response) {
            // unwrap the data from the response
            return response.data.items;
        }

        function _updateFailed(error) {
            var msg = 'Failed to insert dog';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }


        function _getAll() {
            var settings = {
                url: '/api/person',
                method: 'GET',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                withCredentials: true
            };
            return $http(settings)
                .then(_getAllComplete, _postTwoFailed);
        }

        function _getAllComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _getAllFailed(error) {
            var msg = 'Failed to insert dog';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }
    }
})();