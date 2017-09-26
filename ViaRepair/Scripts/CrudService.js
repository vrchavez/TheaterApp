(function () {
    "use strict";
    angular.module("crudApp", [])
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
                url: '/Api/Activities/' + data,
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
                url: '/Api/Activities',
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
                url: '/Api/Activities/' + data.id,
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
                url: '/Api/Activities',
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
            return response.data.items;
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